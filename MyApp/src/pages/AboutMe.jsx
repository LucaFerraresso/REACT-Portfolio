import React from "react";
import { motion } from "framer-motion";

// Varianti di animazione
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1, // Ritardo tra le sezioni
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

const AboutMe = () => {
  return (
    <div
      className="bg-gray-100 min-h-screen py-10 font-montserrat"
      style={{
        backgroundImage: "url(/assets-images/aboutme-img/binarybackground.jpg)",
        backgroundSize: "500px",
        backgroundRepeat: "repeat",
      }}
    >
      <motion.section
        id="about"
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Primo blocco */}
        <motion.div
          className="flex justify-center items-center"
          variants={fadeIn}
        >
          <motion.img
            src="/assets-images/aboutme-img/poligonalbackground.jpg"
            alt="About me"
            className="rounded-lg shadow-lg max-w-full h-auto"
            variants={fadeIn}
          />
        </motion.div>
        <motion.div className="flex flex-col justify-center" variants={fadeIn}>
          <p className="text-md sm:text-lg mt-4 mb-6 bg-white text-black p-10 border border-gray-300 rounded-3xl">
            Hello, I'm Ferraresso Luca, and I've been working as a Frontend
            Developer for the past six months. Although I'm relatively new to
            the field, my passion for technology and design drives me to
            continuously learn and improve every day.
          </p>
        </motion.div>

        {/* Secondo blocco */}
        <motion.div className="flex flex-col justify-center" variants={fadeIn}>
          <p className="text-md sm:text-lg mt-4 mb-6 bg-white text-black p-10 border border-gray-300 rounded-3xl">
            From the moment I wrote my first line of code, I was captivated by
            the power of technology to create engaging and intuitive user
            experiences. I enjoy taking on the challenge of turning complex
            ideas into visually appealing, functional websites that users love
            to interact with.
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center items-center"
          variants={fadeIn}
        >
          <motion.img
            src="/assets-images/aboutme-img/codebackground.jpg"
            alt="Coding"
            className="rounded-lg shadow-lg max-w-full h-auto"
            variants={fadeIn}
          />
        </motion.div>

        {/* Terzo blocco */}
        <motion.div
          className="flex justify-center items-center"
          variants={fadeIn}
        >
          <motion.img
            src="/assets-images/aboutme-img/languagespics.jpg"
            alt="Design and development"
            className="rounded-lg shadow-lg max-w-full h-auto"
            variants={fadeIn}
          />
        </motion.div>
        <motion.div className="flex flex-col justify-center" variants={fadeIn}>
          <p className="text-md sm:text-lg mt-4 mb-6 bg-white text-black p-10 border border-gray-300 rounded-3xl">
            I have a strong interest in the intersection of design and
            development, where creativity meets functionality. Whether it's
            through crafting responsive layouts, experimenting with animations,
            or optimizing performance, I'm dedicated to bringing design concepts
            to life on the web.
          </p>
        </motion.div>

        {/* Quarto blocco */}
        <motion.div className="flex flex-col justify-center" variants={fadeIn}>
          <p className="text-md sm:text-lg mt-4 mb-6 bg-white text-black p-10 border border-gray-300 rounded-3xl">
            I'm excited about the journey ahead, eager to contribute to
            innovative projects, and committed to growing as a developer. I'm
            looking forward to building more amazing things and connecting with
            others who share my enthusiasm for technology and design.
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center items-center"
          variants={fadeIn}
        >
          <motion.img
            src="/assets-images/aboutme-img/codebackground2.jpg"
            alt="Future projects"
            className="rounded-lg shadow-lg max-w-full h-auto"
            variants={fadeIn}
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutMe;
