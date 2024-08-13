import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../useContext/AuthContext"; // Importa il contesto
import { toast } from "react-toastify"; // Importa la libreria toast
import { logoutUser } from "../../API/firebaseAuth"; // Importa la funzione di logout
import { FaUserCircle } from "react-icons/fa"; // Importa l'icona utente

const menulist = [
  { name: "Home", path: "/homepage" },
  { name: "Projects", path: "/projects" },
];

const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout effettuato!");
      navigate("/homepage");
    } catch (error) {
      toast.error("Errore durante il logout: " + error.message);
    }
  };

  const getNavBarStyles = () => {
    if (location.pathname === "/homepage" || location.pathname === "/aboutme") {
      return "bg-white text-black border-b border-gray-300";
    }
    return "bg-gray-800 text-white";
  };

  return (
    <nav
      className={`${getNavBarStyles()} p-4 flex flex-col sm:flex-row justify-between items-center text-lg sm:text-2xl`}
    >
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
      </ul>
      <div className="flex items-center space-x-4">
        {!loading && user ? (
          <>
            <span className="text-black sm:text-white">
              Benvenuto, {user.email.split("@")[0]}
            </span>
            <button onClick={handleLogout} className="text-red underline">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">
            <FaUserCircle className="text-3xl sm:text-4xl" />
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
