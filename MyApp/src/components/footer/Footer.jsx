import { NavLink, useLocation } from "react-router-dom";

const menuFooter = [
  { name: "Contacts", path: "/contacts" },
  { name: "About me", path: "/aboutme" },
];

const Footer = () => {
  const location = useLocation();

  // Funzione per ottenere lo stile del footer
  const getFooterStyles = () => {
    if (location.pathname === "/homepage" || location.pathname === "/aboutme") {
      return {
        container: "bg-white text-black border-t border-gray-300",
        link: "text-black border-b-2 border-black",
      };
    }
    return {
      container: "bg-gray-800 text-white",
      link: "text-white",
    };
  };

  const { container, link } = getFooterStyles();

  return (
    <nav
      className={`${container} p-4 flex flex-col sm:flex-row justify-between items-center text-lg sm:text-2xl`}
    >
      <p className="text-sm">&copy; 2024 MyPortfolio. All Rights Reserved.</p>
      <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 m-0 w-full sm:w-auto">
        {menuFooter.map((item, index) => (
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
    </nav>
  );
};

export default Footer;
