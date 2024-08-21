import React from "react";
//animazioni
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/motions";

const Section = ({ imageSrc, altText, paragraph, reverse }) => {
  return (
    <>
      <motion.div variants={fadeIn}>
        <motion.img
          src={imageSrc}
          alt={altText}
          className="rounded-lg shadow-lg max-w-full h-auto"
          variants={fadeIn}
        />
      </motion.div>
      <motion.div className="flex flex-col justify-center" variants={fadeIn}>
        <p className="text-md sm:text-lg mt-4 mb-6 bg-white text-black p-10 border border-gray-300 rounded-3xl">
          {paragraph}
        </p>
      </motion.div>
    </>
  );
};

export default Section;
