import React from "react";
import { motion } from "framer-motion";
//importare l'icona di facebook e gmail
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaLinkedin,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaLinkedin, url: "https://www.linkedin.com", color: "text-blue-600" },
  { icon: FaGithub, url: "https://github.com", color: "text-black" },
  { icon: FaFacebook, url: "https://facebook.com", color: "text-blue-600" },
];

const techIcons = [
  { icon: FaJsSquare, color: "text-yellow-500", name: "JavaScript" },
  { icon: FaReact, color: "text-blue-500", name: "React" },
  { icon: FaNodeJs, color: "text-green-500", name: "Node.js" },
  { icon: FaHtml5, color: "text-red-500", name: "HTML5" },
  { icon: FaCss3Alt, color: "text-blue-600", name: "CSS3" },
];

const imgPath = "/assets-images/HomePageImg/myFoto.jpg";

const HomePage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, staggerChildren: 0.5 },
    },
  };

  return (
    <>
      <div className="flex flex-col min-h-screen border border-black">
        {/* Sezione 1 */}
        <motion.section
          id="about"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 lg:p-8 my-10 border border-black"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Sezione immagine */}
          <div className="flex justify-center items-center h-1/2 lg:h-full border border-black">
            <motion.img
              src={imgPath}
              alt="Your Photo"
              loading="lazy"
              className="rounded-tr-3xl rounded-bl-3xl w-48 h-48 lg:w-3/4 lg:h-auto mb-6 lg:mb-0 shadow-lg border-4 border-gradient-to-r from-green to-blue-500 hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Sezione About Me */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-1/2 lg:h-full border border-black">
            <motion.h2 className="text-4xl lg:text-5xl font-bold">
              Hi, my name is Luca Ferraresso, I'm a Web Developer.
            </motion.h2>

            <motion.p className="text-lg lg:text-xl mt-4 mb-6 text-gray-700 border border-black">
              Based in Venice, Italy, I am a React enthusiast and I love to
              create beautiful and functional websites, I guess.
            </motion.p>

            <motion.div className="flex justify-center lg:justify-start space-x-6 mt-6 border border-black">
              {socialLinks.map(({ icon: Icon, url, color }, index) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeIn}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.8 }}
                  className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-gray-300"
                  aria-label={`Visit ${
                    url.includes("linkedin") ? "LinkedIn" : "GitHub"
                  }`}
                >
                  <Icon className={`${color} text-5xl`} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Sezione 2 */}
        <motion.section
          id="skills"
          className="p-4 lg:p-8 my-10 border border-black"
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.5,
            delayChildren: 0.5,
            staggerChildren: 1,
          }}
          variants={fadeIn}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6">
            Tech Stack
          </h2>

          <motion.div
            className="flex flex-wrap justify-center gap-6 border border-black"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.5,
                },
              },
            }}
          >
            {techIcons.map(({ icon: Icon, color, name }, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border hover:border-gray-300  border-black"
                aria-label={name}
              >
                <Icon className={`${color} text-5xl lg:text-6xl`} />
                <h1 className="mt-2 text-lg font-semibold">{name}</h1>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Sezione 3 */}
        <motion.section
          id="projects"
          className="p-4 lg:p-8 my-10 border border-black"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-dark-blue">
            Recent Projects
          </h2>
          <motion.div
            className="flex flex-wrap gap-10 justify-center border border-black"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.5,
                },
              },
            }}
          >
            <motion.a
              href="https://todoapp-bice-two.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-gray-300 block border-black"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              aria-label="Visit ToDo-app"
              variants={fadeIn}
            >
              <img
                src="/assets-images/projects-preview-images/Screenshot (2955).png"
                alt="ToDo-app"
                className="w-full h-40 object-cover mb-4 rounded-lg border border-black"
              />
              <h3 className="text-xl font-semibold mb-2 text-dark-blue">
                ToDo-App (JavaScript only)
              </h3>
              <p className="text-gray-700">
                A brief description of what this project is about.
              </p>
              <a
                href="https://github.com/LucaFerraresso/Edgemony/tree/main/CODE-WEEK-ACTIVITY-SUPER"
                className="text-strong-cyan hover:underline mt-2 block border border-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </motion.a>

            <motion.a
              href="https://icescream-menu-app.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border hover:border-gray-300 block border-black"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              aria-label="Visit Ice-Cream-App"
              variants={fadeIn}
            >
              <img
                src="/assets-images/projects-preview-images/Screenshot (2957).png"
                alt="Ice-Cream-App"
                className="w-full h-40 object-cover mb-4 rounded-lg border border-black"
              />
              <h3 className="text-xl font-semibold mb-2 text-dark-blue">
                Ice-Cream menù App (JavaScript only)
              </h3>
              <p className="text-gray-700">
                A brief description of what this project is about.
              </p>
              <a
                href="https://github.com/LucaFerraresso/Edgemony/tree/main/HTML%20CSS%20JAVA-SCRIPT/Javascript%20Project"
                className="text-strong-cyan hover:underline mt-2 block border border-black"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </motion.a>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
};

export default HomePage;
