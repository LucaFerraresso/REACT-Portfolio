import React from "react";
import { motion } from "framer-motion";
import { motionContainer, motionIcon } from "../../animations/motions";
import { useTranslation } from "react-i18next";

const SkillsSection = ({ techIcons }) => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8  bg-gray-100 ">
      <motion.section
        id="skills"
        className="w-full max-w-7xl p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100"
        initial="hidden"
        animate="visible"
        variants={motionContainer}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-center mb-8">
          {t("Tech Stack")}
        </h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 justify-items-center"
          variants={motionContainer}
        >
          {techIcons.map(({ icon: Icon, color, name }, index) => (
            <motion.div
              key={index}
              variants={motionIcon}
              custom={index}
              className="w-full max-w-[200px] p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center border border-gray-300 bg-white hover:animate-pulse"
              aria-label={t(name)} // Traduzione del nome della tecnologia
            >
              {/* Icona con una dimensione responsive */}
              <Icon
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl ${color}`}
              />
              <h1 className="mt-3 text-sm sm:text-base md:text-lg font-semibold text-center">
                {t(name)}
              </h1>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </section>
  );
};

export default SkillsSection;
