import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow bg-slate-600">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
