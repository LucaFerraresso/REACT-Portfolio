import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaMailBulk,
} from "react-icons/fa";

const socialLinksContact = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/luca-ferraresso-493a63305/",
    color: "text-blue-600",
  },
  {
    icon: FaGithub,
    url: "https://github.com/LucaFerraresso/",
    color: "text-black",
  },
  {
    icon: FaFacebook,
    url: "https://www.facebook.com/luca.ferraresso",
    color: "text-blue-600",
  },
  {
    icon: FaMailBulk,
    url: "https://gmail.com",
    color: "text-red",
  },
  {
    icon: FaTwitter,
    url: "https://x.com/FerraressoLuca",
    color: "text-blue-400",
  },
];

// Varianti di animazione
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const socialLinkVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.5,
    },
  }),
};

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 font-montserrat">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-text-dark-desaturated-blue mb-4">
            Mettiti in contatto con me!
          </h2>
          <p className="text-lg mb-4">
            Compila il modulo qui sotto per inviare un messaggio:
          </p>
          <div className="flex flex-col space-y-2 mb-4">
            <p>
              <strong>Feat. Luca Ferraresso</strong>
            </p>
            <p>Via Caxias ## ### ##</p>
            <p>Tel: 334 83 66 ###</p>
            <p>Email: lucaferraresso96@gmail.com</p>
          </div>
          <motion.div
            className="flex p-2 gap-2 justify-center space-x-4 mt-4 mb-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {socialLinksContact.map(({ icon: Icon, url, color }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialLinkVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
              >
                <Icon
                  className={`text-3xl  hover:scale-150 transition:scale-150 duration-300 ${color}`}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-white p-6 rounded-lg"
          variants={fadeIn}
        >
          <div className="mb-4">
            <label
              className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
              htmlFor="nome"
            >
              Nome *
            </label>
            <input
              type="text"
              id="nome"
              placeholder="Nome"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
              htmlFor="cognome"
            >
              Cognome *
            </label>
            <input
              type="text"
              id="cognome"
              placeholder="Cognome"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
              htmlFor="telefono"
            >
              Telefono (opzionale)
            </label>
            <input
              type="tel"
              id="telefono"
              placeholder="Telefono"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
              htmlFor="messaggio"
            >
              Messaggio *
            </label>
            <textarea
              id="messaggio"
              placeholder="Messaggio"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <motion.button
            type="submit"
            className="w-full bg-purple hover:bg-gradient-to-r from-purple to-dark-grayish-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          >
            Invia il messaggio
          </motion.button>
        </motion.form>
      </motion.div>

      <ToastContainer />
    </div>
  );
};

export default ContactPage;
