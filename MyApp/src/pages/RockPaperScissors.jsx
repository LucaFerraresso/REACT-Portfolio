import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, motionContainer, motionIcon } from "../animations/motions";

const choices = [
  {
    name: "rock",
    image: "/Exercises/rock-paper-scissors-master/images/icon-rock.svg",
    color: "red",
  },
  {
    name: "paper",
    image: "/Exercises/rock-paper-scissors-master/images/icon-paper.svg",
    color: "blue",
  },
  {
    name: "scissors",
    image: "/Exercises/rock-paper-scissors-master/images/icon-scissors.svg",
    color: "yellow",
  },
  {
    name: "lizard",
    image: "/Exercises/rock-paper-scissors-master/images/icon-lizard.svg",
    color: "green",
  },
  {
    name: "spock",
    image: "/Exercises/rock-paper-scissors-master/images/icon-spock.svg",
    color: "purple",
  },
];

const winConditions = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

const ChoiceButton = ({ choice, onClick }) => (
  <motion.div
    variants={motionIcon}
    initial="hidden"
    animate="visible"
    custom={Math.random()}
    className="relative cursor-pointer m-2 border border-white rounded-full shadow-lg transform"
    onClick={() => onClick(choice.name)}
    style={{ padding: "10px", backgroundColor: choice.color }}
  >
    <div className="bg-white p-2 rounded-full">
      <img
        src={choice.image}
        alt={choice.name}
        className="w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-300 ease-in-out"
        style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))" }}
      />
    </div>
  </motion.div>
);

const RockPaperScissors = () => {
  const [gameState, setGameState] = useState({
    playerChoice: "",
    computerChoice: "",
    result: "",
    score: 0,
    showRules: false,
    isStandardMode: true,
  });

  const availableChoices = gameState.isStandardMode
    ? choices.slice(0, 3)
    : choices;

  const getRandomChoice = () =>
    availableChoices[Math.floor(Math.random() * availableChoices.length)];

  const handlePlayerChoice = (choice) => {
    const computer = getRandomChoice().name;
    const playerWins = winConditions[choice].includes(computer);
    const newScore = playerWins ? gameState.score + 1 : gameState.score - 1;

    setGameState((prevState) => ({
      ...prevState,
      playerChoice: choice,
      computerChoice: computer,
      result: playerWins
        ? "You win!"
        : choice === computer
        ? "It's a tie!"
        : "You lose!",
      score: newScore,
    }));
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2c2c54] to-[#1e1e32] px-4 font-barlow"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        Rock Paper Scissors
      </h1>
      <h2 className="text-xl sm:text-2xl text-white mb-4">
        Score: {gameState.score}
      </h2>

      <motion.div
        layout
        className="flex flex-wrap justify-center mb-8"
        variants={motionContainer}
        initial="hidden"
        animate="visible"
      >
        {availableChoices.map((choice) => (
          <ChoiceButton
            key={choice.name}
            choice={choice}
            onClick={handlePlayerChoice}
          />
        ))}
      </motion.div>

      <div className="text-center text-lg text-white mb-4">
        {gameState.playerChoice && (
          <p className="mb-1">
            You chose:{" "}
            <span className="font-bold">{gameState.playerChoice}</span>
          </p>
        )}
        {gameState.computerChoice && (
          <p className="mb-1">
            Computer chose:{" "}
            <span className="font-bold">{gameState.computerChoice}</span>
          </p>
        )}
        <AnimatePresence>
          {gameState.result && (
            <motion.p
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`font-bold ${
                gameState.result === "You win!"
                  ? "text-green"
                  : gameState.result === "It's a tie!"
                  ? "text-yellow-500"
                  : "text-red"
              }`}
            >
              {gameState.result === "You win!"
                ? "🎉 You win! 🎉"
                : gameState.result}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={() =>
          setGameState((prevState) => ({ ...prevState, showRules: true }))
        }
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded transition duration-300 hover:bg-blue-600"
        whileHover={{ scale: 1.05 }}
      >
        Show Rules
      </motion.button>
      <motion.button
        onClick={() =>
          setGameState((prevState) => ({
            ...prevState,
            isStandardMode: !prevState.isStandardMode,
          }))
        }
        className="mt-4 px-6 py-2 bg-gray-500 text-white font-bold rounded transition duration-300 hover:bg-gray-600"
        whileHover={{ scale: 1.05 }}
      >
        {gameState.isStandardMode
          ? "Switch to Advanced Mode"
          : "Switch to Standard Mode"}
      </motion.button>

      <AnimatePresence>
        {gameState.showRules && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
          >
            <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg max-w-xs w-full mx-6 my-4">
              <button
                onClick={() =>
                  setGameState((prevState) => ({
                    ...prevState,
                    showRules: false,
                  }))
                }
                className="absolute top-2 right-2 text-black text-lg font-bold"
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Game Rules
              </h2>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Standard Rules:</h3>
                <img
                  src="/Exercises/rock-paper-scissors-master/images/image-rules.svg"
                  alt="Standard Game Rules"
                  className="w-full h-auto rounded-lg max-w-[200px] mx-auto"
                />
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Bonus Rules:</h3>
                <img
                  src="/Exercises/rock-paper-scissors-master/images/image-rules-bonus.svg"
                  alt="Bonus Game Rules"
                  className="w-full h-auto rounded-lg max-w-[200px] mx-auto"
                />
              </div>

              <motion.button
                onClick={() =>
                  setGameState((prevState) => ({
                    ...prevState,
                    showRules: false,
                  }))
                }
                className="mt-4 px-4 py-2 bg-gray-300 text-black font-bold rounded transition duration-300 hover:bg-gray-400"
                whileHover={{ scale: 1.05 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RockPaperScissors;
