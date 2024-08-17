import React from "react";
import {
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaLinkedin,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";

import SkillsSection from "../components/homepage/SkillSection";
import HeroSection from "../components/homepage/HeroSection";
import ProjectsSection from "../components/homepage/ProjectSection";

const socialLinks = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com",
    color: "text-blue-600",
  },
  {
    icon: FaGithub,
    url: "https://github.com",
    color: "text-black",
  },
  {
    icon: FaFacebook,
    url: "https://facebook.com",
    color: "text-blue-600",
  },
];

const techIcons = [
  { icon: FaJsSquare, color: "text-yellow-500", name: "JavaScript" },
  { icon: FaReact, color: "text-blue-500", name: "React" },
  //{ icon: FaNodeJs, color: "text-green", name: "Node.js" },
  { icon: FaHtml5, color: "text-red", name: "HTML5" },
  { icon: FaCss3Alt, color: "text-blue-600", name: "CSS3" },
];

const projects = [
  {
    title: "ToDo-App (JavaScript only)",
    image: "/assets-images/projects-preview-images/Screenshot (2955).png",
    description: "A brief description of what this project is about.",
    github:
      "https://github.com/LucaFerraresso/Edgemony/tree/main/HTML%20CSS%20JAVA-SCRIPT/Javascript%20Project",
    vercel: "https://todoapp-bice-two.vercel.app/",
  },
  {
    title: "Ice-Cream menù App (JavaScript only)",
    image: "/assets-images/projects-preview-images/Screenshot (2957).png",
    description: "A brief description of what this project is about.",
    github:
      "https://github.com/LucaFerraresso/Edgemony/tree/main/CODE-WEEK-ACTIVITY-SUPER",
    vercel: "https://icescream-menu-app.vercel.app/",
  },
];

const imgPath = "/assets-images/HomePageImg/myFoto.jpg";

const HomePage = () => {
  return (
    <>
      {/* Sezione 1 */}
      <HeroSection imgPath={imgPath} socialLinks={socialLinks} />
      {/* Sezione 2 */}
      <SkillsSection techIcons={techIcons} />
      {/* Sezione 3 */}
      <ProjectsSection projects={projects} />
    </>
  );
};

export default HomePage;
