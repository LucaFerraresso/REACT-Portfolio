import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const choices = [
    {
      name: "rock",
      image: "/Exercises/rock-paper-scissors-master/images/icon-rock.svg",
    },
    {
      name: "paper",
      image: "/Exercises/rock-paper-scissors-master/images/icon-paper.svg",
    },
    {
      name: "scissors",
      image: "/Exercises/rock-paper-scissors-master/images/icon-scissors.svg",
    },
    {
      name: "lizard",
      image: "/Exercises/rock-paper-scissors-master/images/icon-lizard.svg",
    },
    {
      name: "spock",
      image: "/Exercises/rock-paper-scissors-master/images/icon-spock.svg",
    },
  ];

  const getRandomChoice = () =>
    choices[Math.floor(Math.random() * choices.length)];

  const getResult = (player, computer) => {
    if (player === computer) return "It's a tie!";
    if (
      (player === "rock" &&
        (computer === "scissors" || computer === "lizard")) ||
      (player === "paper" && (computer === "rock" || computer === "spock")) ||
      (player === "scissors" &&
        (computer === "paper" || computer === "lizard")) ||
      (player === "lizard" && (computer === "spock" || computer === "paper")) ||
      (player === "spock" && (computer === "scissors" || computer === "rock"))
    ) {
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

  // Animazione per la modale
  const modalAnimation = useSpring({
    opacity: showRules ? 1 : 0,
    transform: showRules ? "translateY(0)" : "translateY(-50px)",
    config: { tension: 250, friction: 20 },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#2c2c54] to-[#1e1e32] px-4">
      <h1 className="text-4xl font-bold text-white mb-4">
        Rock Paper Scissors
      </h1>
      <h2 className="text-2xl text-white mb-4">Score: {score}</h2>

      <div className="flex flex-wrap justify-center mb-8">
        {choices.map((choice) => (
          <div
            key={choice.name}
            className="relative cursor-pointer m-2"
            onClick={() => handlePlayerChoice(choice.name)}
          >
            <img
              src={choice.image}
              alt={choice.name}
              className="bg-white w-20 h-20 rounded-full border-4 border-white transition-transform duration-300 ease-in-out hover:scale-110"
            />
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
                ? "text-green-400"
                : result === "It's a tie!"
                ? "text-yellow-400"
                : "text-red-400"
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
