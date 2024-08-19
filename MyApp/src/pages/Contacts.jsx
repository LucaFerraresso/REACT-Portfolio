import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import ContactInfo from "../components/contacts-page/ContactInfo";
import ContactForm from "../components/contacts-page/ContactPageForm";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const ContactPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 font-montserrat">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Componente per le informazioni di contatto */}
        <ContactInfo />
        {/* Componente per il form di contatto */}
        <ContactForm />
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
