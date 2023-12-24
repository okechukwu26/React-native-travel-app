// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0N0YzNPHs6RQxqF7Tz4LtAAHBLK9qmus",
  authDomain: "travelapp-d622e.firebaseapp.com",
  projectId: "travelapp-d622e",
  storageBucket: "travelapp-d622e.appspot.com",
  messagingSenderId: "510812029107",
  appId: "1:510812029107:web:7f1d7d43bb04e3f2b330c6",
  measurementId: "G-M3YQS07MJ7",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export { auth, ref, storage, uploadBytes, firestore, collection, addDoc };
