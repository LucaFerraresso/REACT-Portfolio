import React, { useState } from "react";
import { motion } from "framer-motion";
import arrowSvg from "/Exercises/age-calculator-app-main/assets/images/icon-arrow.svg";

const InputField = ({ label, value, setValue, error, placeholder }) => (
  <div className="flex flex-col w-full mx-2">
    <label className="block text-smokey-grey uppercase tracking-widest mb-2">
      {label}
    </label>
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`w-full p-4 text-2xl text-center border-2 rounded-lg focus:outline-none ${
        error ? "border-red" : "border-gray-300 focus:border-purple"
      }`}
      placeholder={placeholder}
      required
      style={{ fontSize: "32px" }}
    />
    {error && <div className="text-red text-xs">{error}</div>}
  </div>
);

const validateDateFields = (day, month, year) => {
  const today = new Date();
  const errors = {
    day: day === "" || day > 31 ? "Must be a valid day" : "",
    month: month === "" || month > 12 ? "Must be a valid month" : "",
    year:
      year === "" || year > today.getFullYear() ? "Must be in the past" : "",
  };

  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate > today ||
    birthDate.getDate() !== parseInt(day) ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getFullYear() !== parseInt(year)
  ) {
    errors.day = "Must be a valid date";
  }

  return errors;
};

const AgeCalculator = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  const calculateAge = (e) => {
    e.preventDefault();

    const errors = validateDateFields(day, month, year);
    if (Object.values(errors).some(Boolean)) {
      setErrors(errors);
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
    setErrors({ day: "", month: "", year: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-off-white p-4 font-poppins">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 text-center max-w-lg w-full relative">
        <h1 className="text-3xl font-extrabold text-off-black mb-10 flex items-center justify-center gap-4">
          Age Calculator
          <img src={arrowSvg} alt="arrow" className="w-8 h-8" />
        </h1>
        <form onSubmit={calculateAge}>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <InputField
              label="Day"
              value={day}
              setValue={setDay}
              error={errors.day}
              placeholder="DD"
            />
            <InputField
              label="Month"
              value={month}
              setValue={setMonth}
              error={errors.month}
              placeholder="MM"
            />
            <InputField
              label="Year"
              value={year}
              setValue={setYear}
              error={errors.year}
              placeholder="YYYY"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-purple text-white text-xl font-semibold rounded-lg hover:bg-purple transition-all duration-300"
          >
            Calculate
          </button>
        </form>
        <div className="mt-8">
          <div className="text-center flex flex-col md:flex-row items-center justify-center gap-8">
            {["years", "months", "days"].map((unit) => (
              <>
                <motion.div
                  className="text-5xl md:text-4xl font-extrabold text-purple"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    key={age[unit]}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {age[unit]}
                  </motion.div>
                </motion.div>
                <div className="text-2xl font-bold">{unit}</div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
