import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  logoutUser,
  useAuth,
} from "../API/firebaseAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log("Utente corrente:", user); // Verifica il valore di user

  const handleAuth = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        let authenticatedUser;
        if (isRegistering) {
          authenticatedUser = await registerUser(email, password);
          if (authenticatedUser) {
            toast.success(
              "Registrazione effettuata con successo! Puoi ora effettuare il login."
            );
            setIsRegistering(false); // Torna alla schermata di login
          }
        } else {
          authenticatedUser = await loginUser(email, password);
          if (authenticatedUser) {
            toast.success("Login effettuato con successo!");
            navigate("/homepage");
          } else {
            toast.error("Login fallito. Controlla le tue credenziali.");
          }
        }
      } catch (error) {
        if (isRegistering) {
          toast.error("Errore durante la registrazione. Riprova.");
        } else {
          toast.error("Errore durante il login. Controlla le tue credenziali.");
        }
        console.error("Errore:", error.message);
      }
    } else {
      toast.error("Email o password non validi!");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout effettuato con successo!");
      navigate("/login");
    } catch (error) {
      toast.error("Errore durante il logout: " + error.message);
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <form
          onSubmit={handleAuth}
          className="bg-white p-8 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4">
            {isRegistering ? "Registrati" : "Login"}
          </h2>
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
            {isRegistering ? "Registrati" : "Login"}
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering((prev) => !prev)}
            className="text-blue-500 mt-2"
          >
            {isRegistering
              ? "Hai già un account? Accedi"
              : "Non hai un account? Registrati"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">
            Bentornato, {user.email.split("@")[0]}
          </h2>{" "}
          {/* Mostra solo il nome */}
          <button
            onClick={handleLogout}
            className="bg-green text-white py-2 px-4 rounded hover:bg-green"
          >
            {" "}
            Thank's for your registration! You can LOG-IN now
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
