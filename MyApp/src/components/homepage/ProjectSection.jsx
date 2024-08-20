import React from "react";
import { motion } from "framer-motion";
import { fadeIn, motionIcon } from "../../assets/animations/motions";
import HomePageProjectCard from "../homepage/HomePageProjectCard";

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
              variants={motionIcon}
              custom={index} // Passa l'indice per il ritardo
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              <HomePageProjectCard {...project} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={goToProjects}
            className=" border border-gray-300 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-[300px] hover:bg-blue-700 transition-colors duration-300"
          >
            View All Projects
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
