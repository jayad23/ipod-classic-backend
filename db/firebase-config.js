const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  //measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebase_app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(firebase_app);

console.log("Firebase app initialized 🚀");

module.exports = {
  firebase_app,
  getAnalytics,
  db,
  auth,
};
