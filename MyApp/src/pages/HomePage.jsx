import React from "react";
import { motion } from "framer-motion";
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const socialLinks = [
  { icon: FaLinkedin, url: "https://www.linkedin.com", color: "text-blue-600" },
  { icon: FaGithub, url: "https://github.com", color: "text-black" },
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
      <motion.section
        id="about"
        className=" grid grid-cols-1 sm:grid-cols-2 gap-8 items-center my-10 px-4 sm:px-0 font-montserrat "
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="p-6  flex justify-center ">
          <motion.img
            src={imgPath}
            alt="Your Photo"
            loading="lazy"
            className=" rounded-lg w-48 h-48 sm:w-56 sm:h-56 mb-6 sm:mb-0  shadow-lg border-4 border-gradient-to-r from-green to-blue-500 hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5  text-center sm:text-left">
          <motion.h2 className="text-4xl sm:text-5xl font-bold ">
            Hi, my name is Luca Ferraresso, I'm a Web Developer.
          </motion.h2>

          <motion.p className="text-lg sm:text-xl mt-4 mb-6 text-gray-700">
            Based in Venice, Italy, I am a React enthusiast and i love create
            beautiful and functional websites,i guess.
          </motion.p>

          <motion.div className="flex justify-center sm:justify-start space-x-6 mt-6">
            {socialLinks.map(({ icon: Icon, url, color }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeIn}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.8 }}
                className=" p-6 rounded-lg shodow-md hover:shadow-lg transition-shadow duration-300 border hover:border-gray-300 "
                aria-label={`Visit ${
                  url.includes("linkedin") ? "Linkedin" : "GitHub"
                }`}
              >
                <Icon className={`${color} text-5xl`} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="my-10 px-4 sm:px-0  "
        initial="hidden"
        animate="visible"
        transition={{
          duration: 0.5,
          delayChildren: 0.5,
          staggerChildren: 1,
        }}
        variants={fadeIn}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Tech Stack
        </h2>

        <motion.div
          className="flex flex-row flex-wrap items-center gap-6 justify-center "
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
              className=" p-6 rounded-lg shodow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center border hover:border-gray-300 "
              aria-label={name}
            >
              <Icon className={`${color} text-5xl sm:text-6xl`} />
              <h1 className="mt-2 text-lg font-semibold">{name}</h1>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        id="projects"
        className="my-10 px-4 sm:px-8  "
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-dark-blue">
          Recent Projects
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-10 ml-6 mr-6"
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
          <motion.div className=" p-6 rounded-lg shodow-md hover:shadow-lg transition-shadow duration-300 border hover:border-gray-300  ">
            <img
              src="/assets-images/projects-preview-images/Screenshot (2955).png"
              alt="https://todoapp-bice-two.vercel.app/"
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2 text-dark-blue">
              ToDo-app , JavaScript only
            </h3>
            <p className="text-gray-700">
              A brief description of what this project is about.
            </p>
            <a
              href="https://github.com/LucaFerraresso/Edgemony/tree/main/CODE-WEEK-ACTIVITY-SUPER"
              className="text-strong-cyan hover:underline mt-2 block"
            >
              View on GitHub
            </a>
            <a
              href="https://todoapp-bice-two.vercel.app/"
              className="text-dark-grayish-blue hover:underline mt-2 block"
            >
              View on vercel
            </a>
          </motion.div>

          <motion.div className="  p-6 rounded-lg shodow-md hover:shadow-lg transition-shadow duration-300 border hover:border-gray-300  ">
            <img
              src="/assets-images/projects-preview-images/Screenshot (2957).png"
              alt="https://icescream-menu-app.vercel.app/"
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-semibold mb-2 text-dark-blue">
              Ice-Cream-App menù
            </h3>
            <p className="text-gray-700">
              A brief description of what this project is about.
            </p>
            <a
              href="https://github.com/LucaFerraresso/Edgemony/tree/main/HTML%20CSS%20JAVA-SCRIPT/Javascript%20Project"
              className="text-strong-cyan hover:underline mt-2 block"
            >
              View on GitHub
            </a>
            <a
              href="https://icescream-menu-app.vercel.app/"
              className="text-dark-grayish-blue hover:underline mt-2 block"
            >
              View on vercel
            </a>
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default HomePage;
