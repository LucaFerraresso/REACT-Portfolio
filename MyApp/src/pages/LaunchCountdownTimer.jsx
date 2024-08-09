import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const initialState = {
    days: "00",
    hours: "00",
    minutes: "01",
    seconds: "00",
  };

  const [time, setTime] = useState(initialState);
  const [isRunning, setIsRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

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
    setTime(initialState);
    setIsRunning(true);
    setIsCompleted(false);
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
    setIsCompleted(false);
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
      <div className="flex space-x-4 sm:space-x-8">
        <TimeBox label="Days" value={time.days} isCompleted={isCompleted} />
        <TimeBox label="Hours" value={time.hours} isCompleted={isCompleted} />
        <TimeBox
          label="Minutes"
          value={time.minutes}
          isCompleted={isCompleted}
        />
        <TimeBox
          label="Seconds"
          value={time.seconds}
          isCompleted={isCompleted}
        />
      </div>
      <div className="mt-10 flex space-x-6">
        <SocialIcon href="#" icon="icon-facebook.svg" />
        <SocialIcon href="#" icon="icon-pinterest.svg" />
        <SocialIcon href="#" icon="icon-instagram.svg" />
      </div>
      <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={resetTimer}
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Reset Timer
        </button>
        <button
          onClick={() => handleDateChange(1, 0, 0, 0)}
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Set to 24h
        </button>
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
const TimeBox = ({ label, value, isCompleted }) => (
  <div
    className={`p-4 sm:p-6 rounded-lg text-center transform transition-transform hover:scale-110 ${
      isCompleted ? "bg-light-cyan text-dark-blue" : "bg-very-dark-blue"
    } animate-flip`}
  >
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
