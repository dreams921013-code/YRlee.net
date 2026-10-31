/* PUBLIC Firebase Web App configuration (not a service-account key).
 * Enter values from Firebase Console → Project settings → Your apps → Web.
 * Keep passwords and service-account JSON files OUT of this repository. */
export const firebaseConfig = {
  apiKey: "AIzaSyBvgMqtJWOS-lkAynNQNAlZ5f52M7SnlqE",
  authDomain: "eem-laborator.firebaseapp.com",
  projectId: "eem-laborator",
  storageBucket: "eem-laborator.firebasestorage.app",
  messagingSenderId: "132944231612",
  appId: "1:132944231612:web:53d8158a0f17f81999a4b9",
  measurementId: "G-J4FVMD59MX"
};
// Firebase Authentication → Users → your administrator account → User UID.
export const adminUid = "OC7KhpDgUfY9yKjUTfXkeHvtlgq2";
export const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
