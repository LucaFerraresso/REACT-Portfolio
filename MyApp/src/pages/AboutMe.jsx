import React from "react";
//animazioni
import { motion } from "framer-motion";
import { staggerContainer } from "../animations/motions";
//componente
import Section from "../components/aboutme-page/Section";
//array mappato
import { sectionsData } from "../components/aboutme-page/sectionData";

const AboutMe = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 font-montserrat">
      <motion.section
        id="about"
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6 md:px-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {sectionsData.map((section, index) => (
          <Section
            key={index}
            imageSrc={section.imageSrc}
            altText={section.altText}
            paragraph={section.paragraph}
            reverse={index % 2 !== 0}
          />
        ))}
      </motion.section>
    </div>
  );
};

export default AboutMe;
