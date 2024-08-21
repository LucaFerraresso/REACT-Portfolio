import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../useContext/AuthContext";
import { toast } from "react-toastify";
import { logoutUser } from "../../API/firebaseAuth";
import { FaUserCircle } from "react-icons/fa";

const menulist = [{ name: "Home", path: "/homepage" }];

const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we are on a project page
  const isOnProjectPage = location.pathname.startsWith("/exercise/");

  // Determine if we are on one of the main pages
  const isHomepageOrAbout = [
    "/homepage",
    "/aboutme",
    "/contacts",
    "/projects",
  ].includes(location.pathname);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logout effettuato!");
      navigate("/homepage");
    } catch (error) {
      toast.error("Errore durante il logout: " + error.message);
    }
  };

  return (
    <nav
      className={`${
        isHomepageOrAbout
          ? "bg-white text-black border-b border-gray-300"
          : "bg-gray-800 text-white"
      } p-4 flex justify-between items-center text-lg sm:text-2xl`}
    >
      <ul className="flex space-x-6">
        {menulist.map((item, index) => (
          <li key={index}>
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
        {/* Conditionally render the "Progetti" link */}
        {isOnProjectPage && (
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-green underline" : ""
              }
              to="/projects"
            >
              Projects
            </NavLink>
          </li>
        )}
      </ul>
      <div className="flex items-center space-x-4">
        {!loading && user ? (
          <>
            <span className={isHomepageOrAbout ? "text-black" : "text-white"}>
              Benvenuto, {user.email.split("@")[0]}
            </span>
            <button onClick={handleLogout} className="text-red underline">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">
            <FaUserCircle className="text-4xl" />
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
