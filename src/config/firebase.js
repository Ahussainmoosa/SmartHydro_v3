import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB9WR7S-i6dsEitb7zAsrc7cG-xoewahwI",
  authDomain: "smart-hydro-v3.firebaseapp.com",
  databaseURL: "https://smart-hydro-v3-default-rtdb.firebaseio.com",
  projectId: "smart-hydro-v3",
  storageBucket: "smart-hydro-v3.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
});

export default app;