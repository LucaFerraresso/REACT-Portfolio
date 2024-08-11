import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../API/firebaseAuth";
import { toast } from "react-toastify";
import { useAuth } from "../useContext/AuthContext";
import { Flipper, Flipped } from "react-flip-toolkit"; // Importa react-flip-toolkit

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuth = async (e) => {
    e.preventDefault();

    // Regex per validare l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex per validare la password (minimo 6 caratteri, almeno una lettera, un numero e un carattere speciale)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Email non valida, inserisci una email valida.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password non valida! Deve contenere almeno 6 caratteri, un numero e un carattere speciale."
      );
      return;
    }

    try {
      let authenticatedUser;

      if (isRegistering) {
        authenticatedUser = await registerUser(email, password);
        if (authenticatedUser) {
          toast.success(
            "Registrazione effettuata con successo! Login Automatico."
          );
          setIsRegistering(false);
        } else {
          toast.error("Registrazione fallita. Riprova.");
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
      toast.error("Errore durante l'operazione. Riprova.");
      console.error("Errore:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
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
        <Flipper flipKey={isRegistering}>
          <Flipped flipId="form">
            <div
              className={`bg-white p-8 rounded shadow-md w-80 transition-transform duration-500 ease-in-out`}
              style={{
                transform: isRegistering ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              <form
                onSubmit={handleAuth}
                className={`transition-opacity duration-500 ease-in-out ${
                  isRegistering ? "opacity-0" : "opacity-100"
                }`}
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
                    placeholder="Inserisci la tua email"
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
                    placeholder="Inserisci la tua password"
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
            </div>
          </Flipped>
        </Flipper>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">
            Benvenuto, {user.email.split("@")[0]}
          </h2>
          <button
            onClick={handleLogout}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
