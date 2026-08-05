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

// Returns a Firebase ID token for the signed-in Google account. The token is
// short-lived (about an hour); the caller falls back to the sign-in screen
// when Firestore rejects it.
export async function adminSignIn() {
  const [{ getApp, getApps, initializeApp }, auth] = await Promise.all([
    import("firebase/app"),
    import("firebase/auth"),
  ]);

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const instance = auth.getAuth(app);
  const provider = new auth.GoogleAuthProvider();

  // Always show the chooser: signing in with the wrong Google account
  // otherwise fails silently against the rules with a permission error.
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await auth.signInWithPopup(instance, provider);

  return result.user.getIdToken();
}

export async function adminSignOut() {
  const [{ getApp, getApps }, auth] = await Promise.all([
    import("firebase/app"),
    import("firebase/auth"),
  ]);

  if (!getApps().length) {
    return;
  }

  await auth.signOut(auth.getAuth(getApp()));
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

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
    throw new Error(
      data?.error?.message || data?.[0]?.error?.message || "QUERY_FAILED"
    );
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
