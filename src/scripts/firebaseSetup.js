import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const setup = {
  apiKey: "AIzaSyCLW0hpQlyg2Z6mbAT3N2kv_7PLgc1aPzw",
  authDomain: "sylvia-learning-system.firebaseapp.com",
  projectId: "sylvia-learning-system",
  storageBucket: "sylvia-learning-system.appspot.com",
  messagingSenderId: "862992455184",
  appId: "1:862992455184:web:7177db82e609db80b75c95",
};

const firebaseApp = initializeApp(setup);

export const database = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const cloudStorage = getStorage(firebaseApp);
