import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stato dell'utente

  const login = (username) => {
    setUser(username); // Imposta l'username come utente loggato
  };

  const logout = () => {
    setUser("null"); // Rimuovi l'utente loggato
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
