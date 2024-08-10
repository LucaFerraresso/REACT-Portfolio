import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, useAuth } from "../firebaseauth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); // Ottieni l'utente autenticato

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const loggedInUser = await loginUser(email, password); // Usa loginUser per autenticare l'utente
        if (loggedInUser) {
          toast.success("Login effettuato con successo!");
          navigate("/homepage"); // Reindirizza alla homepage
        } else {
          toast.error("Login fallito. Controlla le tue credenziali.");
        }
      } catch (error) {
        toast.error("Errore durante il login. Riprova.");
        console.error("Errore durante il login:", error);
      }
    } else {
      toast.error("Email o password non validi!");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser(); // Effettua il logout
      toast.success("Logout effettuato con successo!");
      navigate("/login"); // Reindirizza alla pagina di login
    } catch (error) {
      toast.error("Errore durante il logout. Riprova.");
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Bentornato, {user.email}</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
