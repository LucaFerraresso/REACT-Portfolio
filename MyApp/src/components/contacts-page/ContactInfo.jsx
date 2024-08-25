import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaMailBulk } from "react-icons/fa";
import { motionContainer, fadeIn, motionIcon } from "../../animations/motions";
import { useTranslation } from "react-i18next";

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

const ContactInfo = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex flex-col w-full lg:w-1/2 mb-8 lg:mb-0"
      variants={fadeIn}
    >
      <h2 className="text-2xl font-bold text-text-dark-desaturated-blue mb-4">
        {t("Get in touch with me!")}
      </h2>
      <p className="text-lg mb-4">
        {t("Fill out the form below to send a message:")}
      </p>
      <div className="flex flex-col space-y-2 mb-4">
        <p>
          <strong>{t("Feat. Luca Ferraresso")}</strong>
        </p>
        <p>{t("Via Caxias ## ### ##")}</p>
        <p>{t("Tel: 334 83 66 ###")}</p>
        <p>Email: lucaferraresso96@gmail.com</p>
      </div>
      <motion.div
        className="flex p-2 gap-2 justify-center space-x-4 mt-4 mb-4"
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        {socialLinksContact.map(({ icon: Icon, url, color }, index) => (
          <motion.a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variants={motionIcon}
            custom={index}
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
