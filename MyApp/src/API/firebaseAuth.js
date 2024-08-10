import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

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

// Puoi usare useAuthState per gestire lo stato dell'utente:
export function useAuth() {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
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
