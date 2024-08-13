import { useState } from "react";

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#2c2c54] to-[#1e1e32]">
      <h1 className="text-4xl font-bold text-white mb-8">
        Rock Paper Scissors
      </h1>
      <h2 className="text-2xl text-white mb-4">Score: {score}</h2>

      <div className="flex space-x-4 mb-8">
        {choices.map((choice) => (
          <div
            key={choice.name}
            className="relative cursor-pointer"
            onClick={() => handlePlayerChoice(choice.name)}
          >
            <img
              src={choice.image}
              alt={choice.name}
              className="bg-white w-24 h-24 rounded-full border-4 border-white transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
        ))}
      </div>

      <div className="text-center text-lg text-white">
        {playerChoice && (
          <p className="mb-2">
            You chose: <span className="font-bold">{playerChoice}</span>
          </p>
        )}
        {computerChoice && (
          <p className="mb-2">
            Computer chose: <span className="font-bold">{computerChoice}</span>
          </p>
        )}
        {result && (
          <p
            className={`font-bold ${
              result === "You win!"
                ? "text-green"
                : result === "It's a tie!"
                ? "text-yellow-400"
                : "text-red"
            }`}
          >
            {result}
          </p>
        )}
      </div>
    </div>
  );
};

export default RockPaperScissors;
