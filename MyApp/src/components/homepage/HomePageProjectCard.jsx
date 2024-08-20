import React from "react";
import { motion } from "framer-motion";

// Varianti di animazione
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const HomePageProjectCard = ({ title, image, description, github, vercel }) => {
  return (
    <motion.div
      variants={fadeIn}
      className="flex flex-col flex-1 justify-between w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300   border border-gray-300 bg-white   sm:min-h-[400px] md:min-h-[450px] lg:min-h-[600px] "
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover mb-4 rounded-lg" // Altezza fissa per uniformità
      />
      <div className="flex flex-col flex-1 justify-between w-full">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center">
          {title}
        </h3>
        <p className="text-base sm:text-lg text-center mb-4 flex-1">
          {description}
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href={vercel}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:underline"
          >
            Live Demo
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red hover:underline"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePageProjectCard;
