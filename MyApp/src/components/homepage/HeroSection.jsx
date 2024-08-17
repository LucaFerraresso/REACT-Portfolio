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
      staggerContainer: 0.5,
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

const HeroSection = ({ imgPath, socialLinks }) => {
  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16  bg-gray-100">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Immagine del profilo */}
        <div className="flex justify-center items-center">
          <motion.img
            src={imgPath}
            alt="Your Photo"
            loading="lazy"
            className="rounded-3xl  w-full max-w-[230px] sm:max-w-[270px] md:max-w-[310px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px]    "
            variants={fadeIn}
          />
        </div>

        {/* Testo di presentazione */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-dark-blue"
            variants={fadeIn}
          >
            Hi, I'm Luca Ferraresso.
          </motion.h2>
          <motion.p
            className="text-md sm:text-lg md:text-xl mt-4 text-grayish-blue"
            variants={fadeIn}
          >
            I’m an enthusiastic Front-End Developer based in Venice, Italy. My
            expertise lies in React and JavaScript, and I'm dedicated to
            crafting responsive, engaging web experiences. I thrive on turning
            complex challenges into intuitive, user-friendly solutions and am
            always excited to explore new technologies and techniques.
          </motion.p>

          {/* Link ai Social Media */}
          <motion.div
            className="flex space-x-4 sm:space-x-6 mt-6"
            variants={fadeIn}
          >
            {socialLinks.map(({ icon: Icon, url, color }, index) => (
              <motion.a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialLinkVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-full ${color} `}
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 hover:scale-150 transition:scale-150 duration-300 " />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
