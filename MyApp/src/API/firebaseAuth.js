import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

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
