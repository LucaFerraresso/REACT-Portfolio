import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          src="https://via.placeholder.com/150" //
          alt="Profilo"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg transition-transform transform hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 w-full flex justify-around p-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="#0077B5"
              style="cursor: pointer; transition: transform 0.3s ease;"
              onmouseover="this.style.transform='scale(1.2)'"
              onmouseout="this.style.transform='scale(1)'"
              onclick="window.open('https://www.linkedin.com/', '_blank')"
            >
              <path d="M22.23 0H1.77C.792 0 0 .77 0 1.72v20.56C0 23.23.792 24 1.77 24H22.23C23.208 24 24 23.23 24 22.28V1.72C24 .77 23.208 0 22.23 0zM7.09 20.48H3.56V9H7.1v11.48h-.01zm-1.77-13.18c-1.13 0-2.05-.94-2.05-2.1 0-1.16.92-2.1 2.05-2.1 1.13 0 2.05.94 2.05 2.1-.01 1.16-.92 2.1-2.05 2.1zM20.48 20.48h-3.53v-5.9c0-1.41-.02-3.22-1.97-3.22-1.97 0-2.27 1.53-2.27 3.11v6h-3.53V9h3.38v1.57h.05c.47-.9 1.63-1.84 3.36-1.84 3.6 0 4.27 2.37 4.27 5.45v6.3z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="#1877F2"
              style="cursor: pointer; transition: transform 0.3s ease;"
              onmouseover="this.style.transform='scale(1.2)'"
              onmouseout="this.style.transform='scale(1)'"
              onclick="window.open('https://www.facebook.com/', '_blank')"
            >
              <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.492v-9.294H9.615v-3.622h3.2V8.412c0-3.166 1.934-4.888 4.759-4.888 1.354 0 2.515.101 2.854.146v3.31l-1.96.001c-1.534 0-1.83.729-1.83 1.796v2.354h3.656l-.477 3.622h-3.179V24h6.228c.731 0 1.324-.593 1.324-1.324V1.324C24 .593 23.407 0 22.676 0z" />
            </svg>
          </a>
          <a
            href="https://gmail.com"
            className="text-blue-700 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="#D14836"
              style="cursor: pointer; transition: transform 0.3s ease;"
              onmouseover="this.style.transform='scale(1.2)'"
              onmouseout="this.style.transform='scale(1)'"
              onclick="window.open('https://mail.google.com/', '_blank')"
            >
              <path
                d="M12 13.172L3.342 7.167C3.119 7.011 2.829 7 2.588 7H2v11h7V14h6v4h7V7h-.588c-.24 0-.53.011-.754.167L12 13.172z"
                fill="#D14836"
              />
              <path
                d="M12 11.328L20.684 5.168C20.472 5.059 20.241 5 20 5H4c-.241 0-.472.059-.684.168L12 11.328z"
                fill="#EA4335"
              />
              <path
                d="M22 4.25c0-.199-.033-.388-.093-.568-.14-.417-.429-.745-.807-.924-.235-.109-.49-.17-.751-.17h-2.897l.001.001L12 8.106 5.547 2.589H2.661c-.261 0-.516.061-.751.17-.378.179-.667.507-.807.924C2.033 3.862 2 4.051 2 4.25v1.597L12 12l10-6.153V4.25z"
                fill="#D14836"
              />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="#181717"
              style="cursor: pointer; transition: transform 0.3s ease;"
              onmouseover="this.style.transform='scale(1.2)'"
              onmouseout="this.style.transform='scale(1)'"
              onclick="window.open('https://github.com/', '_blank')"
            >
              <path d="M12 0a12 12 0 00-3.793 23.393c.6.111.793-.261.793-.577v-2.233c-3.325.724-4.025-1.606-4.025-1.606a3.168 3.168 0 00-1.327-1.742c-1.086-.742.083-.724.083-.724a2.511 2.511 0 011.832 1.232 2.548 2.548 0 003.48.993 2.548 2.548 0 01.762-1.606c-2.654-.3-5.454-1.328-5.454-5.908a4.623 4.623 0 011.232-3.209 4.304 4.304 0 01.12-3.167s1.004-.321 3.294 1.232a11.394 11.394 0 016.006 0c2.29-1.553 3.293-1.232 3.293-1.232a4.3 4.3 0 01.12 3.167 4.617 4.617 0 011.232 3.209c0 4.598-2.8 5.606-5.459 5.908.48.415.88 1.218.88 2.453v3.63c0 .316.193.688.793.577A12 12 0 0012 0z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-500 transition-transform transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="#1DA1F2"
              style="cursor: pointer; transition: transform 0.3s ease;"
              onmouseover="this.style.transform='scale(1.2)'"
              onmouseout="this.style.transform='scale(1)'"
              onclick="window.open('https://twitter.com/', '_blank')"
            >
              <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.563-2.005.974-3.127 1.195-.897-.957-2.178-1.554-3.594-1.554-2.825 0-5.096 2.292-5.096 5.115 0 .4.045.79.13 1.165-4.232-.212-7.982-2.237-10.494-5.319-.438.748-.688 1.614-.688 2.533 0 1.747.89 3.291 2.24 4.194-.825-.026-1.6-.253-2.28-.633v.064c0 2.438 1.735 4.474 4.042 4.937-.422.115-.867.176-1.325.176-.324 0-.641-.031-.952-.088.641 2.003 2.5 3.461 4.697 3.501-1.722 1.353-3.891 2.159-6.252 2.159-.406 0-.804-.024-1.197-.069 2.229 1.429 4.88 2.263 7.72 2.263 9.268 0 14.33-7.691 14.33-14.353 0-.22-.006-.44-.015-.658.987-.713 1.84-1.6 2.514-2.614l-.047-.02z" />
            </svg>
          </a>
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
