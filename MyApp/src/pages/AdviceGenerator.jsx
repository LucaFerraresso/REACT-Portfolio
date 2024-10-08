import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getRandomAdvice } from "../API/getData";

const AdviceApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [advice, setAdvice] = useState("");
  const [id, setId] = useState(0);
  const [isIlluminated, setIsIlluminated] = useState(false);

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await getRandomAdvice();
      const data = response;
      setAdvice(data.slip.advice);
      setId(data.slip.id);
    } catch (error) {
      console.error("Error fetching advice:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    setIsIlluminated(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    await getAdvice();
    setIsIlluminated(false);
  };

  return (
    <div className="min-h-screen bg-dark-blue flex items-center justify-center p-4 font-manrope">
      <div className="bg-dark-grayish-blue text-center p-8 rounded-xl shadow-lg max-w-md w-full relative">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="text-2xl text-light-cyan mb-4">Loading...</div>
            <div className="bg-gray-700 h-8 w-full mb-4"></div>
            <div className="bg-gray-700 h-6 w-3/4 mb-2"></div>
            <div className="bg-gray-700 h-6 w-2/3"></div>
          </div>
        ) : (
          <>
            <p className="text-neon-green text-sm mb-2">ADVICE #{id}</p>
            <h1 className="text-2xl text-light-cyan mb-6">"{advice}"</h1>
            <div className="mb-6 flex items-center justify-center">
              <svg
                className="hidden md:block"
                width="384"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <path fill="#4F5D74" d="M0 8h144v1H0zM240 8h144v1H240z" />
                  <g transform="translate(182)" fill="#CEE3E9">
                    <rect width="6" height="16" rx="3" />
                    <rect x="14" width="6" height="16" rx="3" />
                  </g>
                </g>
              </svg>
              <svg
                className="md:hidden"
                width="192"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <path fill="#4F5D74" d="M0 8h80v1H0zM112 8h80v1H112z" />
                  <g transform="translate(88)" fill="#CEE3E9">
                    <rect width="6" height="16" rx="3" />
                    <rect x="14" width="6" height="16" rx="3" />
                  </g>
                </g>
              </svg>
            </div>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px 5px rgba(0, 255, 0, 0.5)",
              }}
              onClick={handleClick}
              className="p-4 rounded-full bg-neon-green "
              style={{
                boxShadow: isIlluminated
                  ? "0 0 15px 5px rgba(0, 255, 0, 0.5)"
                  : "none",
                transform: isIlluminated ? "scale(1.05)" : "scale(1)",
              }}
            >
              <img
                src="/Exercises/advice-generator-app-main/images/icon-dice.svg"
                alt="Get Advice"
                className="w-6 h-6"
              />
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdviceApp;
