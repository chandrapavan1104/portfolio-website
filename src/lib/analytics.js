// Lightweight visit tracking.
//
// This deliberately does NOT use the Firebase SDK. A visit is one plain fetch
// to the Firestore REST API, so tracking adds nothing to the bundle — the
// ~150KB Firestore SDK stays lazy-loaded on the feedback pages that submit
// forms, and a visitor reading the home page never downloads it.
//
// Writes are governed by firestore.rules exactly like the SDK path is: the
// collection is create-only, the field shape is validated server-side, and
// `createdAt` is set by a REQUEST_TIME transform so a client cannot forge or
// backdate it.
//
// This file is the PUBLIC write path only. Reading visits back lives in
// ./adminVisits.js, which ships in dev builds alone.

import {
  firebaseConfig,
  firestoreDatabaseId,
  isFirebaseConfigured,
} from "./firebaseConfig";

const COLLECTION = "visits";

const MAX_PATH = 200;
const MAX_REF = 60;
const MAX_REFERRER = 300;
const MAX_UA = 300;

function documentsUrl() {
  const { projectId } = firebaseConfig;

  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${firestoreDatabaseId}/documents`;
}

function clean(value, max) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, max);
}

function randomId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, "");
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

// ---------------------------------------------------------------------------
// Write path (public)
// ---------------------------------------------------------------------------

// One visit per path per browser session. Bouncing between routes and coming
// back would otherwise inflate a path's count with the same person.
function alreadyLogged(path) {
  const key = `visitLogged:${path}`;

  try {
    if (sessionStorage.getItem(key)) {
      return true;
    }

    sessionStorage.setItem(key, "1");
    return false;
  } catch {
    // Private mode or blocked storage: log it rather than lose the visit.
    return false;
  }
}

export function readRef() {
  if (typeof window === "undefined") {
    return "";
  }

  const params = new URLSearchParams(window.location.search);

  return clean(params.get("ref") || params.get("utm_source") || "", MAX_REF);
}

// Fire-and-forget. Tracking must never surface an error to a visitor or hold
// up a render, so every failure is swallowed.
export async function logVisit(path) {
  if (typeof window === "undefined" || !isFirebaseConfigured) {
    return;
  }

  const cleanPath = clean(path, MAX_PATH);

  if (!cleanPath || alreadyLogged(cleanPath)) {
    return;
  }

  const name = `projects/${firebaseConfig.projectId}/databases/${firestoreDatabaseId}/documents/${COLLECTION}/${randomId()}`;

  const body = {
    writes: [
      {
        update: {
          name,
          fields: {
            path: { stringValue: cleanPath },
            ref: { stringValue: readRef() },
            referrer: { stringValue: clean(document.referrer, MAX_REFERRER) },
            ua: { stringValue: clean(navigator.userAgent, MAX_UA) },
          },
        },
        // Server-stamped, so rules can require createdAt == request.time.
        updateTransforms: [
          { fieldPath: "createdAt", setToServerValue: "REQUEST_TIME" },
        ],
        currentDocument: { exists: false },
      },
    ],
  };

  try {
    await fetch(`${documentsUrl()}:commit?key=${firebaseConfig.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Survives the tab closing right after a click-through.
      keepalive: true,
    });
  } catch {
    // Analytics are best-effort by design.
  }
}
