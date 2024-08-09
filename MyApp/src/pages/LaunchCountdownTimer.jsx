import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState({
    days: "08",
    hours: "23",
    minutes: "55",
    seconds: "41",
  });

  const calculateTimeLeft = () => {
    const countDate = new Date("Sep 30, 2024 00:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((gap % day) / hour)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((gap % hour) / minute)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((gap % minute) / second)
      .toString()
      .padStart(2, "0");

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetTimer = () => {
    setTime({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "10",
    });
  };

  const handleDateChange = (newDate) => {
    const now = new Date().getTime();
    const countDate = new Date(newDate).getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(gap / day)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((gap % day) / hour)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((gap % hour) / minute)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((gap % minute) / second)
      .toString()
      .padStart(2, "0");

    setTime({ days, hours, minutes, seconds });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stars bg-cover text-white font-red-hat">
      <h1 className="text-lg sm:text-2xl tracking-wider uppercase text-center mb-8 text-black">
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
          onClick={() => handleDateChange("Dec 31, 2024 00:00:00")}
          className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
        >
          Set to Dec 31, 2024
        </button>
      </div>
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="bg-dark-blue p-4 sm:p-6 rounded-lg text-center transform transition-transform hover:scale-110">
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
