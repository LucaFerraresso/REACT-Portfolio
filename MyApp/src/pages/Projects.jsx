import React from "react";
import ProjectCard from "../components/projects-page/ProjectCard";
import { motion } from "framer-motion";
import { Exercises } from "../components/projects-page/exercisesList";
import { fadeIn, motionContainer } from "../animations/motions";

const Projects = () => {
  return (
    <>
      {" "}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn} // Applica l'animazione fadeIn al div principale
      >
        <motion.h1
          className="text-4xl font-bold text-off-black text-center py-6"
          variants={fadeIn} // Applica l'animazione fadeIn all'intestazione
        >
          Projects
        </motion.h1>
        <motion.div
          className="min-h-screen flex flex-wrap p-4 gap-6 justify-center"
          variants={motionContainer} // Applica l'animazione di tipo stagger al contenitore delle card
          initial="hidden"
          animate="visible"
        >
          {Exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              variants={fadeIn} // Applica l'animazione fadeIn a ciascuna card
              transition={{ delay: index * 0.2 }} // Aggiunge un piccolo delay per ogni card
            >
              <ProjectCard
                title={exercise.title}
                description={exercise.description}
                link={exercise.link}
                backgroundImage={exercise.backgroundImage}
                initialRating={exercise.initialRating}
                projectId={exercise.id}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Projects;
