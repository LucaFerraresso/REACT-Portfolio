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

import HeroSection from "../components/HeroSection";
import HeroSectionSkeleton from "../components/HeroSectionSkeleton";
import SkillsSection from "../components/SkillSection";
import SkillSectionSkeleton from "../components/SkillSectionSkeleton";
import ProjectsSection from "../components/ProjectSection";
import ProjectSectionSkeleton from "../components/ProjectSectionSkeleton";

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
    title: "ToDo-App",
    image: "/assets/images/homepage/todoapp-preview1.png",
    description:
      "The website is a sleek and intuitive to-do app designed for managing daily tasks effortlessly. Users can organize activities into categories like 'Sport', 'Food', 'Family', and 'Other' with interactive buttons. Perfect for keeping your life organized and on track.",
    github:
      "https://github.com/LucaFerraresso/Edgemony/tree/main/HTML%20CSS%20JAVA-SCRIPT/Javascript%20Project",
    vercel: "https://todoapp-bice-two.vercel.app/",
  },
  {
    title: "Ice-Cream menù App",
    image: "/assets/images/homepage/ice-cream-menu-preview1.png",
    description:
      "The website showcases an ice cream menu with an appealing design, offering a smooth user experience perfect for browsing different ice cream flavors. It gives off a fun, summery vibe, ideal for ice cream lovers.",
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
