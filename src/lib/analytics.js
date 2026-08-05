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
// backdate it. Reads require a signed-in admin.

import {
  firebaseConfig,
  firestoreDatabaseId,
  isFirebaseConfigured,
} from "./firebaseConfig";

const COLLECTION = "visits";
const RECENT_LIMIT = 500;

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

// ---------------------------------------------------------------------------
// Read path (admin only)
// ---------------------------------------------------------------------------

export async function adminSignIn(email, password) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "SIGN_IN_FAILED");
  }

  return data.idToken;
}

async function firestoreQuery(idToken, endpoint, body) {
  const response = await fetch(`${documentsUrl()}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || data?.[0]?.error?.message || "QUERY_FAILED");
  }

  return data;
}

function readString(fields, key) {
  return fields?.[key]?.stringValue || "";
}

export async function fetchVisitSummary(idToken) {
  const [countResult, rows] = await Promise.all([
    firestoreQuery(idToken, ":runAggregationQuery", {
      structuredAggregationQuery: {
        structuredQuery: { from: [{ collectionId: COLLECTION }] },
        aggregations: [{ count: {}, alias: "total" }],
      },
    }),
    firestoreQuery(idToken, ":runQuery", {
      structuredQuery: {
        from: [{ collectionId: COLLECTION }],
        orderBy: [
          { field: { fieldPath: "createdAt" }, direction: "DESCENDING" },
        ],
        limit: RECENT_LIMIT,
      },
    }),
  ]);

  const total = Number(
    countResult?.[0]?.result?.aggregateFields?.total?.integerValue || 0
  );

  const visits = (Array.isArray(rows) ? rows : [])
    // A result set can lead with a metadata-only entry that has no document.
    .filter((row) => row.document)
    .map((row) => {
      const fields = row.document.fields || {};

      return {
        id: row.document.name.split("/").pop(),
        path: readString(fields, "path"),
        ref: readString(fields, "ref"),
        referrer: readString(fields, "referrer"),
        ua: readString(fields, "ua"),
        createdAt: fields.createdAt?.timestampValue || "",
      };
    });

  const counts = new Map();

  visits.forEach((visit) => {
    counts.set(visit.path, (counts.get(visit.path) || 0) + 1);
  });

  const byPath = [...counts.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count);

  return { total, sampled: visits.length, byPath, visits };
}

export const RECENT_SAMPLE_LIMIT = RECENT_LIMIT;
