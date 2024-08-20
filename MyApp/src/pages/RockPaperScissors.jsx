import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

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

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [isStandardMode, setIsStandardMode] = useState(true);

  const availableChoices = isStandardMode ? choices.slice(0, 3) : choices;

  const getRandomChoice = () =>
    availableChoices[Math.floor(Math.random() * availableChoices.length)];

  const getResult = (player, computer) => {
    if (player === computer) return "It's a tie!";
    if (winConditions[player].includes(computer)) {
      setScore((prevScore) => prevScore + 1);
      return "You win!";
    }
    setScore((prevScore) => prevScore - 1);
    return "You lose!";
  };

  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice);
    const computer = getRandomChoice().name;
    setComputerChoice(computer);
    setResult(getResult(choice, computer));
  };

  const modalAnimation = useSpring({
    opacity: showRules ? 1 : 0,
    transform: showRules ? "translateY(0)" : "translateY(-50px)",
    config: { tension: 250, friction: 20 },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#2c2c54] to-[#1e1e32] px-4 font-barlow">
      <h1 className="text-4xl font-bold text-white mb-4">
        Rock Paper Scissors
      </h1>
      <h2 className="text-2xl text-white mb-4">Score: {score}</h2>

      <div className="flex flex-wrap justify-center mb-8">
        {availableChoices.map((choice) => (
          <div
            key={choice.name}
            className="relative cursor-pointer m-2 border border-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handlePlayerChoice(choice.name)}
            style={{ padding: "10px", backgroundColor: choice.color }}
          >
            <div className="bg-white p-2 rounded-full">
              {" "}
              {/* Sfondo per le immagini */}
              <img
                src={choice.image}
                alt={choice.name}
                className="w-28 h-28 transition-transform duration-300 ease-in-out"
                style={{ filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.5))" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-lg text-white mb-4">
        {playerChoice && (
          <p className="mb-1">
            You chose: <span className="font-bold">{playerChoice}</span>
          </p>
        )}
        {computerChoice && (
          <p className="mb-1">
            Computer chose: <span className="font-bold">{computerChoice}</span>
          </p>
        )}
        {result && (
          <p
            className={`font-bold ${
              result === "You win!"
                ? "text-green"
                : result === "It's a tie!"
                ? "text-yellow"
                : "text-red"
            }`}
          >
            {result}
          </p>
        )}
      </div>

      <button
        onClick={() => setShowRules(true)}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded transition duration-300 hover:bg-blue-600"
      >
        Show Rules
      </button>
      <button
        onClick={() => setIsStandardMode((prev) => !prev)}
        className="mt-4 px-6 py-2 bg-gray-500 text-white font-bold rounded transition duration-300 hover:bg-gray-600"
      >
        {isStandardMode ? "Switch to Advanced Mode" : "Switch to Standard Mode"}
      </button>

      {showRules && (
        <animated.div
          style={modalAnimation}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
        >
          <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg max-w-xs w-full mx-6 my-4">
            <button
              onClick={() => setShowRules(false)}
              className="absolute top-2 right-2 text-black text-lg font-bold"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Game Rules</h2>

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

            <button
              onClick={() => setShowRules(false)}
              className="mt-4 px-4 py-2 bg-gray-300 text-black font-bold rounded transition duration-300 hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </animated.div>
      )}
    </div>
  );
};

export default RockPaperScissors;
