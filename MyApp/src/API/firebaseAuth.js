import { signInWithEmailAndPassword, signOut } from "firebase/auth";
//import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Errore nel login: ", error);
    return null;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Errore nel logout: ", error);
  }
}

// per registrarsi la prima volta
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Errore nella registrazione: ", error);
    return null;
  }
}
