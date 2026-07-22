// Anonymous feedback + pageview writes.
//
// The Firebase SDK is imported dynamically so it never lands in the main
// bundle: only visitors who actually open a feedback page pay for it.
//
// Nothing identifying is stored. No auth, no IP, no user agent, no cookie.
// A submission is the answers, the project slug, an optional ?ref tag, and a
// server timestamp.

import {
  firebaseConfig,
  firestoreDatabaseId,
  isFirebaseConfigured,
} from "./firebaseConfig";

const MAX_TEXT = 2000;
const MAX_CONTACT = 200;
const MAX_REF = 60;

// Firestore retries a write forever rather than rejecting it: a missing
// database or a dead connection leaves addDoc pending indefinitely, which would
// pin the submit button on "Sending" with nothing shown to the visitor.
const WRITE_TIMEOUT_MS = 12000;

function withTimeout(promise, ms) {
  let timer;

  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("write-timeout")), ms);
    }),
  ]);
}

let firestorePromise = null;

async function getFirestore() {
  if (!isFirebaseConfigured) {
    throw new Error("firebase-not-configured");
  }

  if (!firestorePromise) {
    firestorePromise = (async () => {
      const [{ initializeApp, getApps, getApp }, firestore] = await Promise.all([
        import("firebase/app"),
        import("firebase/firestore"),
      ]);

      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

      return { db: firestore.getFirestore(app, firestoreDatabaseId), firestore };
    })().catch((error) => {
      // Let the next attempt retry instead of caching a failed init.
      firestorePromise = null;
      throw error;
    });
  }

  return firestorePromise;
}

function clean(value, max) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, max);
}

export function readRef() {
  if (typeof window === "undefined") {
    return "";
  }

  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref") || params.get("utm_source") || "";

  return clean(ref, MAX_REF);
}

export async function submitFeedback({ projectSlug, answers, ref }) {
  const { db, firestore } = await getFirestore();

  const payload = {
    projectSlug: clean(projectSlug, 64),
    rating: Number(answers.rating) || 0,
    role: clean(answers.role, 40),
    wouldUse: clean(answers.wouldUse, 20),
    highlights: Array.isArray(answers.highlights)
      ? answers.highlights.slice(0, 8).map((item) => clean(item, 40))
      : [],
    missing: clean(answers.missing, MAX_TEXT),
    extra: clean(answers.extra, MAX_TEXT),
    contact: clean(answers.contact, MAX_CONTACT),
    ref: clean(ref, MAX_REF),
    createdAt: firestore.serverTimestamp(),
  };

  await withTimeout(
    firestore.addDoc(firestore.collection(db, "feedback"), payload),
    WRITE_TIMEOUT_MS
  );
}

// Fire-and-forget. A failed pageview must never surface to the visitor or
// block the form, so this swallows its own errors.
export async function logPageview(projectSlug, ref) {
  try {
    const { db, firestore } = await getFirestore();

    await withTimeout(
      firestore.addDoc(firestore.collection(db, "pageviews"), {
        projectSlug: clean(projectSlug, 64),
        ref: clean(ref, MAX_REF),
        createdAt: firestore.serverTimestamp(),
      }),
      WRITE_TIMEOUT_MS
    );
  } catch {
    // Analytics are best-effort by design.
  }
}
