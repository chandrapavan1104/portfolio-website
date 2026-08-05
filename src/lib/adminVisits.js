// Admin read path for the visits dashboard — DEV ONLY.
//
// This module is imported exclusively by MelaAdmin, which BuilderMelaApp
// mounts behind `import.meta.env.DEV`. Rollup therefore drops the whole file
// from the production bundle: the deployed site contains no admin route, no
// dashboard code, and no Firebase Auth import. Verify after a build with:
//
//   grep -rl "fetchVisitSummary" dist/assets   # expect no matches
//
// Sign-in is Google popup rather than email/password, matching the account
// used for the Firebase console. firestore.rules gates reads on the token's
// email, so the provider is interchangeable as far as the rules are concerned.

import { firebaseConfig, firestoreDatabaseId } from "./firebaseConfig";

const COLLECTION = "visits";
const RECENT_LIMIT = 500;

function documentsUrl() {
  const { projectId } = firebaseConfig;

  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${firestoreDatabaseId}/documents`;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
//
// Sign in once and stay signed in. The session persists in localStorage and
// the SDK refreshes the ID token on its own, so the login screen is a
// first-run step rather than something to repeat. Callers never hold a token:
// they ask for a fresh one per query via getIdToken(), which serves a cached
// value until it is close to expiry.

let authPromise = null;

async function getAuthInstance() {
  if (!authPromise) {
    authPromise = (async () => {
      const [{ getApp, getApps, initializeApp }, auth] = await Promise.all([
        import("firebase/app"),
        import("firebase/auth"),
      ]);

      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      const instance = auth.getAuth(app);

      // Survives a tab close, unlike the default in-memory/session behaviour.
      await auth.setPersistence(instance, auth.browserLocalPersistence);

      return { instance, auth };
    })().catch((error) => {
      authPromise = null;
      throw error;
    });
  }

  return authPromise;
}

// Resolves with the restored user once, after persistence has loaded. Returns
// null when nobody is signed in — onAuthStateChanged fires either way, which
// is why this is not just a currentUser read.
async function waitForUser() {
  const { instance, auth } = await getAuthInstance();

  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(instance, (user) => {
      unsubscribe();
      resolve(user || null);
    });
  });
}

// True when a previous session is still good, so the dashboard can skip the
// sign-in screen and go straight to loading.
export async function restoreAdminSession() {
  const user = await waitForUser();

  return user ? { email: user.email || "" } : null;
}

export async function adminSignIn() {
  const { instance, auth } = await getAuthInstance();
  const provider = new auth.GoogleAuthProvider();

  // Always show the chooser: signing in with the wrong Google account
  // otherwise fails silently against the rules with a permission error.
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await auth.signInWithPopup(instance, provider);

  return { email: result.user.email || "" };
}

export async function adminSignOut() {
  const { instance, auth } = await getAuthInstance();

  await auth.signOut(instance);
}

async function getIdToken() {
  const user = await waitForUser();

  if (!user) {
    throw new Error("NOT_SIGNED_IN");
  }

  return user.getIdToken();
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

async function firestoreQuery(endpoint, body) {
  const idToken = await getIdToken();

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
    throw new Error(
      data?.error?.message || data?.[0]?.error?.message || "QUERY_FAILED"
    );
  }

  return data;
}

function readString(fields, key) {
  return fields?.[key]?.stringValue || "";
}

export async function fetchVisitSummary() {
  const [countResult, rows] = await Promise.all([
    firestoreQuery(":runAggregationQuery", {
      structuredAggregationQuery: {
        structuredQuery: { from: [{ collectionId: COLLECTION }] },
        aggregations: [{ count: {}, alias: "total" }],
      },
    }),
    firestoreQuery(":runQuery", {
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
