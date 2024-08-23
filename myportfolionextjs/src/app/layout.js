import { Inter } from "next/font/google";
import DefaultLayout from "@/customLayout/DefaultLayout";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LF PortfolioNextjs",
  description: "Portfolio of Luca Ferraresso, next app",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
};
export default Layout;
