import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbeAWH6_JFUz5iaVkX-MlAmGNhLx3oq1I",
  authDomain: "ecommerce-app-8e9e0.firebaseapp.com",
  projectId: "ecommerce-app-8e9e0",
  storageBucket: "ecommerce-app-8e9e0.appspot.com",
  messagingSenderId: "184075370842",
  appId: "1:184075370842:web:ca69c7add5e7252748f363",
  measurementId: "G-S9NE693TQR",
};
export default firebaseConfig;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
