import { useEffect, useState } from "react";
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

import HeroSection from "../components/homepage/HeroSection";
import HeroSectionSkeleton from "../components/homepage/HeroSectionSkeleton";
import SkillsSection from "../components/homepage/SkillSection";
import SkillSectionSkeleton from "../components/homepage/SkillSectionSkeleton";
import ProjectsSection from "../components/homepage/ProjectSection";
import ProjectSectionSkeleton from "../components/homepage/ProjectSectionSkeleton";

const socialLinks = [
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/luca-ferraresso-493a63305/",
    color: "text-blue-600",
  },
  {
    icon: FaGithub,
    url: "https://github.com/LucaFerraresso/",
    color: "text-black",
  },
  //{
  //  icon: FaFacebook,
  //  url: "https://www.facebook.com/luca.ferraresso",
  //  color: "text-blue-600",
  //},
];

const techIcons = [
  { icon: FaJsSquare, color: "text-yellow-500", name: "JavaScript" },
  { icon: FaReact, color: "text-blue-500", name: "React" },
  { icon: FaHtml5, color: "text-red", name: "HTML5" },
  { icon: FaCss3Alt, color: "text-blue-600", name: "CSS3" },
  { icon: FaNodeJs, color: "text-green", name: "Coming soon" },
];

const projects = [
  {
    title: "MongoDB database operations",
    image: "/assets/images/homepage/mongodb-app-preview.png",
    descriptionKey: "project.mongodb", // Modifica qui
    github:
      "https://github.com/LucaFerraresso/REACT-Portfolio/tree/main/my-next-mongodb-app",
    vercel: "https://mongodb-crud-operations.vercel.app/",
  },
  {
    title: "ToDo-App",
    image: "/assets/images/homepage/todoapp-preview1.png",
    descriptionKey: "project.todoapp", // Modifica qui
    github:
      "https://github.com/LucaFerraresso/Edgemony/tree/main/HTML%20CSS%20JAVA-SCRIPT/Javascript%20Project",
    vercel: "https://todoapp-bice-two.vercel.app/",
  },
  {
    title: "Ice-Cream menù App",
    image: "/assets/images/homepage/ice-cream-menu-preview1.png",
    descriptionKey: "project.icecream", // Modifica qui
    github:
      "https://github.com/LucaFerraresso/Edgemony/tree/main/CODE-WEEK-ACTIVITY-SUPER",
    vercel: "https://icescream-menu-app.vercel.app/",
  },
];

const imgPath = "/assets/images/homepage/myFoto.jpg";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);
  if (isLoading) {
    return (
      <div className="font-montserrat">
        <HeroSectionSkeleton />
        <SkillSectionSkeleton />
        <ProjectSectionSkeleton />
      </div>
    );
  }
  return (
    <>
      <div className="font-montserrat">
        {/* Sezione 1 */}
        <HeroSection imgPath={imgPath} socialLinks={socialLinks} />
        {/* Sezione 2 */}
        <SkillsSection techIcons={techIcons} />
        {/* Sezione 3 */}
        <ProjectsSection projects={projects} />
      </div>
    </>
  );
};

export default HomePage;
