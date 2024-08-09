import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinkedInSvg from "../components/svg/LinkedInSvg";
import FacebookSvg from "../components/svg/FacebookSvg";
import GmailSvg from "../components/svg/GmailSvg";
import GitHubSvg from "../components/svg/GitHubSvg";
import TwitterSvg from "../components/svg/TwitterSvg";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Iscrizione avvenuta con successo!");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-main-bg p-6">
      {/* Foto e Loghi */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:w-2/3 mb-8 lg:mb-0">
        <div className="lg:w-1/2 lg:mr-8 mb-8 lg:mb-0">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-primary-input-border shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="lg:w-1/2 flex justify-around lg:flex-col items-center lg:items-start lg:justify-start space-y-4 lg:space-y-6">
          <LinkedInSvg className="hover:text-blue-500 transition-colors duration-300 ease-in-out" />
          <FacebookSvg className="hover:text-blue-700 transition-colors duration-300 ease-in-out" />
          <GmailSvg className="hover:text-red-500 transition-colors duration-300 ease-in-out" />
          <GitHubSvg className="hover:text-gray-900 transition-colors duration-300 ease-in-out" />
          <TwitterSvg className="hover:text-blue-400 transition-colors duration-300 ease-in-out" />
        </div>
      </div>

      {/* Form Iscrizione */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/3 bg-white p-8 rounded-lg shadow-md transition-all duration-300 ease-in-out animate-fade-in"
      >
        <h2 className="text-xl font-bold mb-6 text-text-dark-desaturated-blue">
          Iscriviti alle notifiche
        </h2>
        <div className="mb-4">
          <label
            className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-text-dark-desaturated-blue text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Telefono (opzionale)
          </label>
          <input
            type="tel"
            id="phone"
            autoComplete="tel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-text-dark-desaturated-blue leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-linear-gradient hover:bg-gradient-to-r from-purple to-dark-grayish-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
        >
          Iscriviti
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
