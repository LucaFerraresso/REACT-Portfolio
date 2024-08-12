import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../useContext/AuthContext"; // Importa il contesto
import { toast } from "react-toastify"; // Importa la libreria toast
import { logoutUser } from "../../API/firebaseAuth"; // Importa la funzione di logout

const menulist = [
  {
    name: "Home",
    path: "/homepage",
  },
  {
    name: "Log-in",
    path: "/login",
  },
];

const Navbar = () => {
  // Recupera l'utente e lo stato di caricamento dal contesto
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Chiama la funzione di logout da firebaseAuth
      toast.success("Logout effettuato!");
      navigate("/homepage");
    } catch (error) {
      toast.error("Errore durante il logout: " + error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center text-lg sm:text-2xl">
      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 m-0 w-full sm:w-auto">
        {menulist.map((item, index) => (
          <li key={index} className="text-center sm:text-left">
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-green underline" : ""
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          </li>
        ))}

        {/* Mostra il benvenuto solo se l'utente è presente e loading è falso */}
        {!loading && user && (
          <>
            <li className="text-center sm:text-left">
              <span className="text-white">
                Benvenuto, {user.email.split("@")[0]}{" "}
              </span>
            </li>
            <li className="text-center sm:text-left">
              <button onClick={handleLogout} className="text-red underline">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
