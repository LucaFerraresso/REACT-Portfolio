import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../useContext/AuthContext";
import { toast } from "react-toastify";
import { logoutUser } from "../../API/firebaseAuth";
import { FaUserCircle } from "react-icons/fa";

import i18n from "../../i18n.js";

const isActiveLanguage = (lng) => i18n.language === lng;

const menulist = [
  { name: "Home", path: "/homepage" },
  { name: "Projects", path: "/projects" },
];

const Navbar = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success(t("Logout") + " " + t("effettuato"));
      navigate("/homepage");
    } catch (error) {
      toast.error(t("Errore durante il logout: ") + error.message);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav
      className={`${
        location.pathname.startsWith("/homepage") ||
        location.pathname.startsWith("/aboutme")
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
              {t(item.name)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        <div>
          <button
            onClick={() => changeLanguage("en")}
            aria-label="Change language to English"
            className={`relative p-1 transition-transform duration-300 ease-in-out transform ${
              isActiveLanguage("en") ? "border-b-2 border-blue-500" : ""
            } hover:scale-110 hover:shadow-lg`}
          >
            <img
              src="/assets/images/flags/flag-en.png"
              alt="English"
              className="w-12 h-12"
            />
          </button>
          <button
            onClick={() => changeLanguage("it")}
            aria-label="Change language to Italian"
            className={`relative p-1 transition-transform duration-300 ease-in-out transform ${
              isActiveLanguage("it") ? "border-b-2 border-blue-500" : ""
            } hover:scale-110 hover:shadow-lg`}
          >
            <img
              src="/assets/images/flags/flag-it.png"
              alt="Italian"
              className="w-12 h-12"
            />
          </button>
        </div>

        {!loading && user ? (
          <>
            <span
              className={
                location.pathname.startsWith("/homepage")
                  ? "text-black"
                  : "text-white"
              }
            >
              {t("Welcome", { name: user.email.split("@")[0] })}
            </span>
            <button onClick={handleLogout} className="text-red underline">
              {t("Logout")}
            </button>
          </>
        ) : (
          <NavLink to="/login">
            <FaUserCircle className="text-4xl" />
            <span>{t("Login")}</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
