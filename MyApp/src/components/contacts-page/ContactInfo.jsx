import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaMailBulk,
} from "react-icons/fa";

// Array di social links con icone e colori
const socialLinksContact = [
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
  {
    icon: FaFacebook,
    url: "https://www.facebook.com/luca.ferraresso",
    color: "text-blue-600",
  },
  {
    icon: FaMailBulk,
    url: "https://gmail.com",
    color: "text-red",
  },
  {
    icon: FaTwitter,
    url: "https://x.com/FerraressoLuca",
    color: "text-blue-400",
  },
];

// Varianti di animazione
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const socialLinkVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (custom) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.5,
    },
  }),
};

const ContactInfo = () => {
  return (
    <motion.div
      className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0"
      variants={fadeIn}
    >
      <h2 className="text-2xl font-bold text-text-dark-desaturated-blue mb-4">
        Mettiti in contatto con me!
      </h2>
      <p className="text-lg mb-4">
        Compila il modulo qui sotto per inviare un messaggio:
      </p>
      <div className="flex flex-col space-y-2 mb-4">
        <p>
          <strong>Feat. Luca Ferraresso</strong>
        </p>
        <p>Via Caxias ## ### ##</p>
        <p>Tel: 334 83 66 ###</p>
        <p>Email: lucaferraresso96@gmail.com</p>
      </div>
      <motion.div
        className="flex p-2 gap-2 justify-center space-x-4 mt-4 mb-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {socialLinksContact.map(({ icon: Icon, url, color }, index) => (
          <motion.a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={socialLinkVariants}
            custom={index}
            whileHover={{ scale: 1.05 }}
          >
            <Icon
              className={`text-3xl hover:scale-150 transition:scale-150 duration-300 ${color}`}
            />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
