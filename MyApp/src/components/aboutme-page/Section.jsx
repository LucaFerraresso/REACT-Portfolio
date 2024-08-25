import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../animations/motions";
import { useTranslation } from "react-i18next";

const Section = ({ imageSrc, altText, paragraphKey, reverse }) => {
  const { t } = useTranslation();

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
          {t(paragraphKey)}
        </p>
      </motion.div>
    </>
  );
};

export default Section;
