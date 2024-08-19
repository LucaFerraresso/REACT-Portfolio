import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5 },
  },
};

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully");
  };

  return (
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
  );
};

export default ContactForm;
