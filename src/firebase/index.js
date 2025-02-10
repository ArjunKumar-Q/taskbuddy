import { initializeApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAABxRGvIcJ6WhZQjwQFaVdx_qSDAVOvzs",
  authDomain: "taskbuddy-ak.firebaseapp.com",
  projectId: "taskbuddy-ak",
  storageBucket: "taskbuddy-ak.firebasestorage.app",
  messagingSenderId: "530055960318",
  appId: "1:530055960318:web:312fdbedca0b8bf0f177af"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };