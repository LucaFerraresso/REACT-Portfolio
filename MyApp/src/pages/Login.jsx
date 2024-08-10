import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../API/firebaseAuth"; // Non importiamo più logoutUser qui, lo prendiamo dal contesto
import { toast } from "react-toastify";
import { useAuth } from "../useContext/AuthContext"; // Assicurati che il percorso sia corretto

const Login = () => {
  const [email, setEmail] = useState(""); // Stato per l'email
  const [password, setPassword] = useState(""); // Stato per la password
  const [isRegistering, setIsRegistering] = useState(false); // Stato per la registrazione
  const navigate = useNavigate(); // Hook per la navigazione
  const { user, logout } = useAuth(); // Otteniamo l'utente e la funzione di logout dal contesto

  const handleAuth = async (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del form

    if (email && password) {
      // Controlla se email e password sono forniti
      try {
        let authenticatedUser;

        if (isRegistering) {
          authenticatedUser = await registerUser(email, password); // Prova a registrare l'utente
          if (authenticatedUser) {
            // Qui non dobbiamo navigare o loggare l'utente
            toast.success(
              "Registrazione effettuata con successo! Puoi ora effettuare il login."
            );
            setIsRegistering(false); // Passa alla schermata di login
          } else {
            toast.error("Registrazione fallita. Riprova.");
          }
        } else {
          authenticatedUser = await loginUser(email, password); // Prova a effettuare il login
          if (authenticatedUser) {
            toast.success("Login effettuato con successo!");
            navigate("/homepage"); // Naviga alla homepage se il login ha successo
          } else {
            toast.error("Login fallito. Controlla le tue credenziali.");
          }
        }
      } catch (error) {
        toast.error("Errore durante l'operazione. Riprova.");
        console.error("Errore:", error.message);
      }
    } else {
      toast.error("Email o password non validi!"); // Messaggio di errore se i campi sono vuoti
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Usa il logout dal contesto
      toast.success("Logout effettuato con successo!");
      navigate("/login"); // Naviga alla pagina di login
    } catch (error) {
      toast.error("Errore durante il logout: " + error.message);
      console.error("Errore durante il logout:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!user ? ( // Se l'utente non è loggato
        <form
          onSubmit={handleAuth}
          className="bg-white p-8 rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4">
            {isRegistering ? "Registrati" : "Login"} // Mostra "Registrati" o
            "Login"
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Aggiorna l'email nello stato
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Aggiorna la password nello stato
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
          >
            {isRegistering ? "Registrati" : "Login"} // Testo del pulsante
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering((prev) => !prev)} // Passa tra registrazione e login
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
            Benvenuto, {user.email.split("@")[0]} // Mostra il nome utente
          </h2>
          <button
            onClick={handleLogout}
            className="bg-green text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
