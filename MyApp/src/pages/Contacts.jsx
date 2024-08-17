import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//svg
import LinkedInSvg from "../components/svg/LinkedInSvg";
import FacebookSvg from "../components/svg/FacebookSvg";
import GmailSvg from "../components/svg/GmailSvg";
import GitHubSvg from "../components/svg/GitHubSvg";
import TwitterSvg from "../components/svg/TwitterSvg";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully");
  };

  return (
    <div className="flex flex-row justify-center items-center lg: min-h-screen bg-main-bg p-6">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0">
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
          <div className="flex p-2 gap-2 justify-center space-x-4 mt-4 mb-4">
            <a>
              <LinkedInSvg />
            </a>
            <a>
              <FacebookSvg />
            </a>
            <a>
              <GmailSvg />
            </a>
            <a>
              <GitHubSvg />
            </a>
            <a>
              <TwitterSvg />
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-md"
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
          <button
            type="submit"
            className="w-full bg-purple hover:bg-gradient-to-r from-purple to-dark-grayish-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
          >
            Invia il messaggio
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ContactPage;
