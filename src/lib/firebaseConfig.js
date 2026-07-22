// Firebase web config.
//
// These values are NOT secrets — Firebase ships them in every client bundle by
// design. Access is controlled by firestore.rules, not by hiding this object.
// That is why they can be committed: the GitHub Actions build then needs no
// extra secrets wired up.
//
// To fill this in: Firebase console -> Project settings -> General ->
// "Your apps" -> Web app -> Config. Paste the values below.
//
// Anything left blank falls back to a VITE_FIREBASE_* env var, so a local
// .env can override without touching this file.

const inlineConfig = {
  apiKey: "AIzaSyBZI2uLALEZhlJWpqN5NKLIpo2TiZZZh8M",
  authDomain: "profilebot-474605.firebaseapp.com",
  projectId: "profilebot-474605",
  storageBucket: "profilebot-474605.firebasestorage.app",
  messagingSenderId: "977721269659",
  appId: "1:977721269659:web:7dc3afcde1a6eea756153e",
  measurementId: "G-VYW96CKHKF"
};

const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseConfig = Object.fromEntries(
  Object.keys(inlineConfig).map((key) => [
    key,
    inlineConfig[key] || envConfig[key] || "",
  ])
);

export const isFirebaseConfigured = Boolean(
  firebaseConfig.projectId && firebaseConfig.apiKey
);

// This project's Firestore instance is a named database, not "(default)".
// getFirestore(app) targets "(default)" and would 404, so the name is required.
export const firestoreDatabaseId =
  import.meta.env.VITE_FIREBASE_DATABASE_ID || "pfeedback";

export default firebaseConfig;
