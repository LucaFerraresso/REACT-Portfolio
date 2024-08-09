import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const CountdownTimer = () => {
  const initialState = {
    days: "99",
    hours: "23",
    minutes: "59",
    seconds: "59",
  };

  const [time, setTime] = useState(initialState);
  const [isRunning, setIsRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    let interval;

    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        const { days, hours, minutes, seconds } = time;

        if (
          days === "00" &&
          hours === "00" &&
          minutes === "00" &&
          seconds === "00"
        ) {
          clearInterval(interval);
          setIsRunning(false);
          setIsCompleted(true);
        } else {
          updateTime();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [time, isRunning, isCompleted]);

  const updateTime = () => {
    const { days, hours, minutes, seconds } = time;

    let newSeconds = parseInt(seconds) - 1;
    let newMinutes = parseInt(minutes);
    let newHours = parseInt(hours);
    let newDays = parseInt(days);

    if (newSeconds < 0) {
      newSeconds = 59;
      newMinutes--;

      if (newMinutes < 0) {
        newMinutes = 59;
        newHours--;

        if (newHours < 0) {
          newHours = 23;
          newDays--;
        }
      }
    }

    setTime({
      days: newDays.toString().padStart(2, "0"),
      hours: newHours.toString().padStart(2, "0"),
      minutes: newMinutes.toString().padStart(2, "0"),
      seconds: newSeconds.toString().padStart(2, "0"),
    });
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    setIsRunning(true);
    setIsCompleted(false);
  };

  const handleSetTimer = () => {
    setIsRunning(false);
    setTime({
      days: inputValues.days.toString().padStart(2, "0"),
      hours: inputValues.hours.toString().padStart(2, "0"),
      minutes: inputValues.minutes.toString().padStart(2, "0"),
      seconds: inputValues.seconds.toString().padStart(2, "0"),
    });
    setIsRunning(true);
    setIsCompleted(false);
    setIsModalOpen(false);
    setInputValues({
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
    }); // Reset input values
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-white font-red-hat transition-colors duration-500 ${
        isCompleted ? "bg-light-cyan" : "bg-dark-blue"
      }`}
    >
      <h1 className="text-lg sm:text-2xl tracking-wider uppercase text-center mb-8 text-light-pink">
        {isCompleted ? "Time's up! Set a new timer." : "We're launching soon"}
      </h1>
      <div className="flex space-x-4 sm:space-x-8 mb-10">
        <TimeBox label="Days" value={time.days} />
        <TimeBox label="Hours" value={time.hours} />
        <TimeBox label="Minutes" value={time.minutes} />
        <TimeBox label="Seconds" value={time.seconds} />
      </div>
      <div className="mt-10 flex space-x-4">
        <button
          onClick={resetTimer}
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Reset Timer
        </button>
        <button
          onClick={() => setIsModalOpen(true)} // Apri la finestra modale
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Set Timer
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex flex-row items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-bold mb-4 text-black">
                Imposta Timer
              </h2>
              <input
                type="number"
                name="days"
                placeholder="Giorni"
                value={inputValues.days}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded text-black"
                style={{ backgroundColor: "#f9f9f9" }}
              />
              <input
                type="number"
                name="hours"
                placeholder="Ore"
                value={inputValues.hours}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded  text-black"
                style={{ backgroundColor: "#f9f9f9" }}
              />
              <input
                type="number"
                name="minutes"
                placeholder="Minuti"
                value={inputValues.minutes}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded  text-black"
                style={{ backgroundColor: "#f9f9f9" }}
              />
              <input
                type="number"
                name="seconds"
                placeholder="Secondi"
                value={inputValues.seconds}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded  text-black"
                style={{ backgroundColor: "#f9f9f9" }}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSetTimer}
                className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
              >
                Imposta
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105 ml-2"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 flex space-x-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-pink hover:text-white"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-pink hover:text-white"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-pink hover:text-white"
        >
          <FaInstagram size={24} />
        </a>
      </div>
      {isCompleted && (
        <div className="mt-10 p-4 bg-soft-red text-dark-blue rounded-lg animate-fade-in">
          <p className="text-center">
            The countdown has ended. Please set a new timer.
          </p>
        </div>
      )}
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="p-4 sm:p-6 rounded-lg text-center transform transition-transform hover:scale-110 bg-very-dark-blue">
    <span className="block text-4xl sm:text-6xl font-bold text-light-pink">
      {value}
    </span>
    <p className="uppercase text-xs sm:text-sm mt-2 tracking-widest">{label}</p>
  </div>
);

export default CountdownTimer;
