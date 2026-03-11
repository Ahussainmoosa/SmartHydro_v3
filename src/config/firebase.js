import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9WR7S-i6dsEitb7zAsrc7cG-xoewahwI",
  authDomain: "smart-hydro-v3.firebaseapp.com",
  databaseURL: "https://smart-hydro-v3-default-rtdb.firebaseio.com",
  projectId: "smart-hydro-v3",
  storageBucket: "smart-hydro-v3.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export default app;