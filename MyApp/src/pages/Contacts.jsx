import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//svg logo importanti come componenti per gestire anche le loro animazioni ecc ecc
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Contattami</h1>
      <div className="relative mb-8">
        <img
          src="https://via.placeholder.com/150"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg transition-transform transform hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-full flex justify-around p-4">
          <LinkedInSvg />
          <FacebookSvg />
          <GmailSvg />
          <GitHubSvg />
          <TwitterSvg />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-lg font-bold mb-4">Iscriviti alle notifiche</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Telefono (opzionale)
          </label>
          <input
            type="tel"
            id="phone"
            autoComplete="tel"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
        >
          Iscriviti
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
