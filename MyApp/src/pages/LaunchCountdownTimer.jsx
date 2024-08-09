import React, { useState, useEffect } from "react";

const initialState = {
  days: "00",
  hours: "00",
  minutes: "01",
  seconds: "00",
};

const CountdownTimer = () => {
  const [time, setTime] = useState(initialState);
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

  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialState);
    setIsRunning(true);
  };

  const handleDateChange = (days, hours, minutes, seconds) => {
    setIsRunning(false);
    setTime({
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    });
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-blue bg-cover text-white font-red-hat">
      <h1 className="text-lg sm:text-2xl tracking-wider uppercase text-center mb-8 text-light-pink">
        We're launching soon
      </h1>
      <div className="flex space-x-4 sm:space-x-8">
        <TimeBox label="Days" value={time.days} />
        <TimeBox label="Hours" value={time.hours} />
        <TimeBox label="Minutes" value={time.minutes} />
        <TimeBox label="Seconds" value={time.seconds} />
      </div>
      <div className="mt-10 flex space-x-6">
        <SocialIcon href="#" icon="icon-facebook.svg" />
        <SocialIcon href="#" icon="icon-pinterest.svg" />
        <SocialIcon href="#" icon="icon-instagram.svg" />
      </div>
      <div className="mt-10 flex space-x-4">
        <button
          onClick={resetTimer}
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Reset Timer
        </button>
        <button
          onClick={() => handleDateChange(1, 0, 0, 0)} // Set to 1 day
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Set to 24h
        </button>
      </div>
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="bg-very-dark-blue p-4 sm:p-6 rounded-lg text-center transform transition-transform hover:scale-110">
    <span className="block text-4xl sm:text-6xl font-bold text-light-pink">
      {value}
    </span>
    <p className="uppercase text-xs sm:text-sm mt-2 tracking-widest">{label}</p>
  </div>
);

const SocialIcon = ({ href, icon }) => (
  <a href={href} className="transform transition-transform hover:scale-110">
    <img
      src={`/Exercises/launch-countdown-timer-main/images/${icon}`}
      alt={icon}
      className="w-8 h-8"
    />
  </a>
);

export default CountdownTimer;
