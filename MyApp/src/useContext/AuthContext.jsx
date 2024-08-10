import React, { createContext, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { logoutUser } from "../API/firebaseAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const logout = async () => {
    try {
      await logoutUser();
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  //oramai non si da nulla per scontato
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(AuthContext);
};
