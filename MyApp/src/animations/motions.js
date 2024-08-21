// Varianti di animazione

// fadein homepage e project section della homepage

const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
    },
  },
};

const motionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerContainer: 0.5,
    },
  },
};

//animazione con delay per icone sociale e icone skill

const motionIcon = {
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

//animazione div sezione about me con delay

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1, // Ritardo tra le sezioni
    },
  },
};

export { fadeIn, motionContainer, motionIcon, staggerContainer };
