import React from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { fadeIn } from "../../animations/motions";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t("Message sent successfully"));
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
          {t("Name")} *
        </label>
        <input
          type="text"
          id="nome"
          placeholder={t("Name")}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
          htmlFor="email"
        >
          {t("Email")} *
        </label>
        <input
          type="email"
          id="email"
          placeholder={t("Email")}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
          htmlFor="telefono"
        >
          {t("Phone (optional)")}
        </label>
        <input
          type="tel"
          id="telefono"
          placeholder={t("Phone (optional)")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
          htmlFor="messaggio"
        >
          {t("Message")} *
        </label>
        <textarea
          id="messaggio"
          placeholder={t("Message")}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <motion.button
        type="submit"
        className="w-full bg-purple hover:bg-gradient-to-r from-purple to-dark-grayish-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
      >
        {t("Send Message")}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
