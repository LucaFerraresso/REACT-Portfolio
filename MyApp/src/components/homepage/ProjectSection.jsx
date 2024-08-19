import React from "react";
import { motion } from "framer-motion";
import HomePageProjectCard from "../homepage/HomePageProjectCard";

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.5, // Ritardo personalizzato per ogni card
    },
  }),
};

const ProjectsSection = ({ projects }) => {
  const goToProjects = () => {
    window.location.href = "/projects";
  };
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 bg-gray-100">
      <motion.div
        className="flex flex-col justify-center gap-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Titolo */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Recent Projects
        </h2>

        {/* Griglia dei progetti */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index} // Passa l'indice per il ritardo
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              <HomePageProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center ">
          <button
            onClick={goToProjects}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 w-[300px]"
          >
            View All Projects
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
