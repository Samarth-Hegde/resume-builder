import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKM2b07Tn-6M4FwegqVjOFs1nkU0zgYeU",
  authDomain: "resume-builder-b7c7b.firebaseapp.com",
  databaseURL:
    "https://resume-builder-b7c7b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "resume-builder-b7c7b",
  storageBucket: "resume-builder-b7c7b.appspot.com",
  messagingSenderId: "585831990419",
  appId: "1:585831990419:web:5f1c99e2c1580d1c01f966",
};

const app = initializeApp(firebaseConfig);
export const fireBaseDataBase = getDatabase(app);
export const fireBaseAuthentication = getAuth(app);
export const fireBaseStorage = getStorage(app);
