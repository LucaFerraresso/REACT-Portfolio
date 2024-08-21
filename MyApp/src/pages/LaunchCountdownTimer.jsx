import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const CountdownTimer = () => {
  const initialState = {
    days: "99",
    hours: "23",
    minutes: "59",
    seconds: "59",
  };

  const getInitialTime = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      days: urlParams.get("days") || initialState.days,
      hours: urlParams.get("hours") || initialState.hours,
      minutes: urlParams.get("minutes") || initialState.minutes,
      seconds: urlParams.get("seconds") || initialState.seconds,
    };
  };

  const [time, setTime] = useState(getInitialTime);
  const [isRunning, setIsRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValues, setInputValues] = useState(initialState);

  useEffect(() => {
    let interval;
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        if (
          time.days === "00" &&
          time.hours === "00" &&
          time.minutes === "00" &&
          time.seconds === "00"
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

  const handleSetTimer = () => {
    const updatedTime = {
      days: inputValues.days.toString().padStart(2, "0"),
      hours: inputValues.hours.toString().padStart(2, "0"),
      minutes: inputValues.minutes.toString().padStart(2, "0"),
      seconds: inputValues.seconds.toString().padStart(2, "0"),
    };
    setTime(updatedTime);
    updateURL(updatedTime);
    setIsRunning(true);
    setIsCompleted(false);
    setIsModalOpen(false);
  };

  const updateURL = (updatedTime) => {
    const url = new URL(window.location);
    Object.entries(updatedTime).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
    window.history.pushState({}, "", url);
  };

  const handleInputChange = (e) =>
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen text-white font-red-hat transition-colors duration-500 ${
        isCompleted ? "bg-light-cyan" : "bg-dark-blue"
      }`}
    >
      <h1 className="text-lg mt-4 sm:text-2xl tracking-wider uppercase text-center mb-8 text-light-pink">
        {isCompleted ? "Time's up! Set a new timer." : "We're launching soon"}
      </h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
        {Object.entries(time).map(([label, value]) => (
          <TimeBox
            key={label}
            label={label.charAt(0).toUpperCase() + label.slice(1)}
            value={value}
          />
        ))}
      </div>
      <div className="mt-4 mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button onClick={resetTimer} label="Reset Timer" />
        <Button onClick={() => setIsModalOpen(true)} label="Set Timer" />
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSetTimer={handleSetTimer}
        >
          {Object.keys(inputValues).map((key) => (
            <InputField
              key={key}
              name={key}
              value={inputValues[key]}
              onChange={handleInputChange}
            />
          ))}
        </Modal>
      )}

      <SocialIcons />

      {isCompleted && (
        <div className="mb-4 p-4 bg-soft-red text-dark-blue rounded-lg animate-fade-in">
          <p className="text-center">
            The countdown has ended. Please set a new timer.
          </p>
        </div>
      )}
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="p-4 sm:p-6 rounded-lg text-center transform transition-transform hover:scale-110 bg-very-dark-blue w-full sm:w-auto">
    <span className="block text-4xl sm:text-6xl font-bold text-light-pink">
      {value}
    </span>
    <p className="uppercase text-xs sm:text-sm mt-2 tracking-widest">{label}</p>
  </div>
);

const Button = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="bg-light-pink p-2 rounded-lg text-sm sm:text-base transform transition-transform hover:scale-105"
  >
    {label}
  </button>
);

const Modal = ({ onClose, onSetTimer, children }) => (
  <div className="fixed inset-0 flex flex-row items-center justify-center bg-black bg-opacity-50">
    <div className="bg-dark-blue p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold mb-4 text-light-pink">
          Imposta Timer
        </h2>
        {children}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={onSetTimer} label="Imposta" />
        <Button onClick={onClose} label="Annulla" />
      </div>
    </div>
  </div>
);

const InputField = ({ name, value, onChange }) => (
  <input
    type="number"
    name={name}
    placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
    value={value}
    onChange={onChange}
    className="border border-gray-400 p-2 rounded text-black"
    style={{ backgroundColor: "#f9f9f9" }}
  />
);

const SocialIcons = () => (
  <div className="mt-4 flex space-x-4 mb-4">
    <SocialIcon href="https://www.facebook.com" Icon={FaFacebook} />
    <SocialIcon href="https://www.twitter.com" Icon={FaTwitter} />
    <SocialIcon href="https://www.instagram.com" Icon={FaInstagram} />
  </div>
);

const SocialIcon = ({ href, Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-light-pink hover:text-white"
  >
    <Icon size={24} />
  </a>
);

export default CountdownTimer;
