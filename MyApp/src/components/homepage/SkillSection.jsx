import React from "react";
import { motion } from "framer-motion";

// Varianti di animazione
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.3, // Ritardo personalizzato per ogni icona
    },
  }),
};

const SkillsSection = ({ techIcons }) => {
  return (
    <section className="flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16  bg-gray-100 ">
      <motion.section
        id="skills"
        className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg bg-gray-100"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
          Tech Stack
        </h2>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 "
          variants={staggerContainer}
        >
          {techIcons.map(({ icon: Icon, color, name }, index) => (
            <motion.div
              key={index}
              variants={iconVariants}
              custom={index}
              className="  p-3 sm:p-4 md:p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border  bg-white  hover:border-gray-300"
              aria-label={name}
            >
              {/* Icona con una dimensione responsive */}
              <Icon
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl ${color}`}
              />
              <h1 className="mt-2 text-sm sm:text-base md:text-lg font-semibold text-center">
                {name}
              </h1>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </section>
  );
};

export default SkillsSection;
