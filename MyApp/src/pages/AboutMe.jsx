import React from "react";
import { motion } from "framer-motion";

const AboutMe = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <motion.section
        id="about"
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-10"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, staggerChildren: 0.3 }}
        variants={fadeIn}
      >
        {/* Primo blocco: immagine a sinistra, testo a destra */}
        <motion.div
          className="flex justify-center items-center"
          variants={imageAnimation}
          transition={{ duration: 0.5 }}
        >
          <img
            src="your-image-url-here.jpg"
            alt="About me"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </motion.div>
        <motion.div
          className="flex flex-col justify-center"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <p className="text-md sm:text-lg mt-4 mb-6">
            Hello, I'm Ferraresso Luca, and I've been working as a Frontend
            Developer for the past six months. Although I'm relatively new to
            the field, my passion for technology and design drives me to
            continuously learn and improve every day.
          </p>
        </motion.div>

        {/* Secondo blocco: testo a sinistra, immagine a destra */}
        <motion.div
          className="flex flex-col justify-center"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <p className="text-md sm:text-lg mt-4 mb-6">
            From the moment I wrote my first line of code, I was captivated by
            the power of technology to create engaging and intuitive user
            experiences. I enjoy taking on the challenge of turning complex
            ideas into visually appealing, functional websites that users love
            to interact with.
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center items-center"
          variants={imageAnimation}
          transition={{ duration: 0.5 }}
        >
          <img
            src="your-image-url-here.jpg"
            alt="Coding"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </motion.div>

        {/* Terzo blocco: immagine a sinistra, testo a destra */}
        <motion.div
          className="flex justify-center items-center"
          variants={imageAnimation}
          transition={{ duration: 0.5 }}
        >
          <img
            src="your-image-url-here.jpg"
            alt="Design and development"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </motion.div>
        <motion.div
          className="flex flex-col justify-center"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <p className="text-md sm:text-lg mt-4 mb-6">
            I have a strong interest in the intersection of design and
            development, where creativity meets functionality. Whether it's
            through crafting responsive layouts, experimenting with animations,
            or optimizing performance, I'm dedicated to bringing design concepts
            to life on the web.
          </p>
        </motion.div>

        {/* Quarto blocco: testo a sinistra, immagine a destra */}
        <motion.div
          className="flex flex-col justify-center"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <p className="text-md sm:text-lg mt-4 mb-6">
            I'm excited about the journey ahead, eager to contribute to
            innovative projects, and committed to growing as a developer. I'm
            looking forward to building more amazing things and connecting with
            others who share my enthusiasm for technology and design.
          </p>
        </motion.div>
        <motion.div
          className="flex justify-center items-center"
          variants={imageAnimation}
          transition={{ duration: 0.5 }}
        >
          <img
            src="your-image-url-here.jpg"
            alt="Future projects"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutMe;
