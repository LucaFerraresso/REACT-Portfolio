import React, { createContext, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
//import { auth } from "../API/firebaseAuth"; // Assicurati che il percorso sia corretto

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const logout = async () => {
    try {
      await logoutUser(); // Assicurati di utilizzare la funzione corretta
    } catch (error) {
      console.error("Errore durante il logout: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};
