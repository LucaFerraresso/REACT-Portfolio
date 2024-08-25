import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const menuFooter = [
  { name: "Contacts", path: "/contacts" },
  { name: "About me", path: "/aboutme" },
];

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHomepageOrAbout = [
    "/homepage",
    "/aboutme",
    "/contacts",
    "/projects",
  ].includes(location.pathname);

  return (
    <footer
      className={`${
        isHomepageOrAbout
          ? "bg-white text-black border-t border-gray-300"
          : "bg-gray-800 text-white"
      } p-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}
    >
      <p className="text-sm text-center md:text-left">
        &copy; 2024 MyPortfolio. {t("All Rights Reserved.")}
      </p>
      <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        {menuFooter.map((item, index) => (
          <li key={index} className="text-center">
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
    </footer>
  );
};

export default Footer;
