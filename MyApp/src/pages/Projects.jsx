import React from "react";
import ProjectCard from "../components/projects-page/ProjectCard";
import { motion } from "framer-motion";
import { Exercises } from "../components/projects-page/exercisesList";
import { fadeIn, motionContainer } from "../animations/motions";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t, i18n } = useTranslation();

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <motion.h1
        className="text-4xl font-bold text-off-black text-center py-6"
        variants={fadeIn}
      >
        {t("projects")}
      </motion.h1>
      <motion.div
        className="min-h-screen flex flex-wrap p-4 gap-6 justify-center"
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        {Exercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            variants={fadeIn}
            transition={{ delay: index * 0.2 }}
          >
            <ProjectCard
              title={t(`title.${exercise.id}`)}
              description={t(`description.${exercise.id}`)} // Utilizza la traduzione
              link={exercise.link}
              backgroundImage={exercise.backgroundImage}
              initialRating={exercise.initialRating}
              projectId={exercise.id}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
