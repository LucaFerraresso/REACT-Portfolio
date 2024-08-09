import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Importa le icone social

const CountdownTimer = () => {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning) {
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
          alert("Il timer ha raggiunto lo zero. Imposta un nuovo timer.");
        } else {
          updateTime();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [time, isRunning]);

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

  const handleDateChange = () => {
    setIsRunning(false);
    setIsRunning(true);
  };

  const handleInputChange = (e, unit) => {
    setTime({ ...time, [unit]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-blue bg-cover text-white font-red-hat px-4">
      <h1 className="text-lg sm:text-2xl tracking-wider uppercase text-center mb-8 text-light-pink">
        We're launching soon
      </h1>
      <div className="flex space-x-4 sm:space-x-8 mb-10">
        <TimeBox
          label="Days"
          value={time.days}
          onChange={(e) => handleInputChange(e, "days")}
        />
        <TimeBox
          label="Hours"
          value={time.hours}
          onChange={(e) => handleInputChange(e, "hours")}
        />
        <TimeBox
          label="Minutes"
          value={time.minutes}
          onChange={(e) => handleInputChange(e, "minutes")}
        />
        <TimeBox
          label="Seconds"
          value={time.seconds}
          onChange={(e) => handleInputChange(e, "seconds")}
        />
      </div>
      <div className="mt-10 flex space-x-4">
        <button
          onClick={handleDateChange}
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Set Timer
        </button>
      </div>
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
    </div>
  );
};

const TimeBox = ({ label, value, onChange }) => (
  <div className="bg-very-dark-blue p-4 sm:p-6 rounded-lg text-center transform transition-transform hover:scale-110">
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="block text-4xl sm:text-6xl font-bold text-light-pink bg-transparent border-none text-center w-16 sm:w-24 focus:outline-none"
    />
    <p className="uppercase text-xs sm:text-sm mt-2 tracking-widest">{label}</p>
  </div>
);

export default CountdownTimer;
