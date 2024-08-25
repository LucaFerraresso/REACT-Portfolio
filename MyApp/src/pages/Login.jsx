import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../API/firebaseAuth"; // Import delle funzioni per login e registrazione
import { toast } from "react-toastify";
import { useAuth } from "../useContext/AuthContext"; // Import del contesto di autenticazione
import { useTranslation } from "react-i18next"; // Import dell'hook useTranslation

const Login = () => {
  const { t } = useTranslation(); // Inizializza l'hook useTranslation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Hook per ottenere lo stato utente e il logout

  // Funzione per gestire l'autenticazione
  const handleAuth = async (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form

    // Regex per validare l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex per validare la password (minimo 6 caratteri, almeno una lettera, un numero e un carattere speciale)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // Validazione email
    if (!emailRegex.test(email)) {
      toast.error(t("Email non valida, inserisci una email valida."));
      return;
    }

    // Validazione password
    if (!passwordRegex.test(password)) {
      toast.error(
        t(
          "Password non valida! Deve contenere almeno 6 caratteri, un numero e un carattere speciale."
        )
      );
      return;
    }

    try {
      // Logica di autenticazione
      if (isRegistering) {
        const authenticatedUser = await registerUser(email, password);
        if (authenticatedUser) {
          toast.success(
            t("Registrazione effettuata con successo! (LOGIN AUTOMATICO)")
          );
          setEmail("");
          setPassword("");
          setIsRegistering(false);
        } else {
          toast.error(t("Registrazione fallita. Riprova."));
        }
      } else {
        const authenticatedUser = await loginUser(email, password);
        if (authenticatedUser) {
          toast.success(t("Login effettuato con successo!"));
          navigate("/homepage");
        } else {
          toast.error(t("Login fallito. Controlla le tue credenziali."));
        }
      }
      navigate("/homepage");
    } catch (error) {
      toast.error(t("Errore durante l'operazione. Riprova."));
      console.error("Errore:", error.message); // Logga l'errore
    }
  };

  // Funzione per gestire il logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t("Logout effettuato con successo!"));
      navigate("/login"); // Naviga alla pagina di login dopo il logout
    } catch (error) {
      toast.error(t("Errore durante il logout: " + error.message));
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!user ? ( // Se l'utente non è loggato, mostra il form
        <div className="bg-white p-8 rounded shadow-md w-80">
          <form onSubmit={handleAuth}>
            <h2 className="text-2xl font-bold mb-4">
              {isRegistering ? t("Registrati") : t("Login")}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">{t("Email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("Inserisci la tua email")}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {t("Password")}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("Inserisci la tua password")}
                className="border border-gray-300 rounded p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            >
              {isRegistering ? t("Registrati") : t("Accedi")}
            </button>
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-500 mt-2"
            >
              {isRegistering
                ? t("Hai già un account? Accedi")
                : t("Non hai un account? Registrati")}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">
            {t("Benvenuto")}, {user.email.split("@")[0]}
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red text-white py-2 px-4 rounded hover:bg-red"
          >
            {t("Logout")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
