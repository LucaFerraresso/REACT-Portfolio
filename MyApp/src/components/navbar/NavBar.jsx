import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../useContext/AuthContext"; // Importa il contesto
import { toast } from "react-toastify"; // Importa la libreria toast

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
  const { user, logout } = useAuth(); // Recupera l'utente dal contesto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(null); // Imposta l'utente su null
    toast.error("Logout effettuato!"); // Toast di errore per il logout
    navigate("/homepage"); // Reindirizza alla pagina di login
  };
  const handleClearLocalStorage = () => {
    localStorage.clear(); // Svuota completamente il localStorage
    toast.success("LocalStorage svuotato con successo!"); // Mostra un toast di conferma
    navigate("/homepage"); // Reindirizza alla homepage
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
        {user && (
          <>
            <li className="text-center sm:text-left">
              <span className="text-white">Benvenuto {user} </span>
            </li>
            <li className="text-center sm:text-left">
              <button onClick={handleLogout} className="text-red">
                Logout
              </button>
            </li>
            <li className="text-center sm:text-left">
              <button onClick={handleClearLocalStorage} className="text-red">
                Clear LocalStorage
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
