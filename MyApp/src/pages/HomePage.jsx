import React from "react";
import { motion } from "framer-motion";
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const imgPath = "/HomePageImg/myFoto.jpg";

const HomePage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.section
        id="about"
        className="text-center my-10 px-4 sm:px-0"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={fadeIn}
      >
        <motion.img
          src={imgPath}
          alt="Your Photo"
          className="mx-auto rounded-full w-24 h-24 sm:w-32 sm:h-32 border-4 border-black mb-4"
          variants={fadeIn}
        />
        <motion.h2 className="text-2xl sm:text-3xl font-bold" variants={fadeIn}>
          Hello, I'am giovanni giorgio...but everyone call me Giorgio
        </motion.h2>
        <motion.p className="text-md sm:text-lg mt-4 mb-6" variants={fadeIn}>
          Based in Venice, Italy, I am a React enthusiast and a web developer. I
          love create beautiful and functional websites,i guess.
        </motion.p>

        <motion.div className="flex justify-center space-x-4" variants={fadeIn}>
          <a
            href="https://www.linkedin.com/in/tuo-profilo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-blue-600 text-4xl" />
          </a>
          <a
            href="https://github.com/tuo-profilo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-black text-4xl" />
          </a>
        </motion.div>
      </motion.section>

      <motion.section
        id="skills"
        className="my-10 px-4 sm:px-0"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delayChildren: 0.5, staggerChildren: 0.2 }}
        variants={fadeIn}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Tech Stack
        </h2>
        <div className="flex justify-center space-x-4 sm:space-x-8">
          <motion.div variants={fadeIn}>
            <FaJsSquare className="text-yellow-500 text-5xl sm:text-6xl" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FaReact className="text-blue-500 text-5xl sm:text-6xl" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FaNodeJs className="text-green-500 text-5xl sm:text-6xl" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FaHtml5 className="text-red-500 text-5xl sm:text-6xl" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FaCss3Alt className="text-blue-600 text-5xl sm:text-6xl" />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default HomePage;
