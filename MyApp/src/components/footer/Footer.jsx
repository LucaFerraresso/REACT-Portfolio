import { NavLink, useLocation } from "react-router-dom";

const menuFooter = [
  { name: "Contacts", path: "/contacts" },
  { name: "About me", path: "/aboutme" },
];

const Footer = () => {
  const location = useLocation();

  const footerStyles =
    location.pathname === "/homepage" || location.pathname === "/aboutme"
      ? {
          container: "bg-white text-black border-t border-gray-300",
          link: "text-black",
        }
      : { container: "bg-gray-800 text-white", link: "text-white" };

  return (
    <footer
      className={`${footerStyles.container} p-4 flex justify-between items-center`}
    >
      <p className="text-sm">&copy; 2024 MyPortfolio. All Rights Reserved.</p>
      <ul className="flex space-x-6">
        {menuFooter.map((item, index) => (
          <li key={index}>
            <NavLink
              className={({ isActive }) =>
                isActive ? "font-bold text-green underline" : footerStyles.link
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
