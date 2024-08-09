import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../useContext/AuthContext"; // Assicurati di importare il contesto
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
  const { user, setUser } = useAuth(); // Recupera l'utente dal contesto
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Imposta l'utente su null
    toast.error("Logout effettuato!"); // Toast di errore per il logout
    navigate("/login"); // Reindirizza alla pagina di login
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
        {user && ( // Mostra il pulsante di logout solo se l'utente è loggato
          <li className="text-center sm:text-left">
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          </li>
        )}
      </ul>
      {user && <div className="text-white">Benvenuto, {user}</div>}{" "}
      {/* Mostra il nome utente */}
    </nav>
  );
};

export default Navbar;
