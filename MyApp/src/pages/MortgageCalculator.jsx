import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MortgageCalculator = () => {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [rate, setRate] = useState("");
  const [type, setType] = useState("repayment");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const validateFields = () => {
    if (!amount || !rate) {
      setError("All fields are required");
      return false;
    }
    if (isNaN(amount) || isNaN(rate)) {
      setError("All fields must be numbers");
      return false;
    }
    if (amount <= 0 || rate < 0) {
      setError(
        "Values must be greater than zero and rate must be zero or more"
      );
      return false;
    }
    setError("");
    return true;
  };

  const calculateRepayments = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const months = term * 12;
    const monthlyRate = rate / 100 / 12;
    const denominator = Math.pow(1 + monthlyRate, months) - 1;

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = amount / months;
      totalPayment = Number(amount);
    } else if (denominator !== 0) {
      monthlyPayment =
        amount *
        monthlyRate *
        (Math.pow(1 + monthlyRate, months) / denominator);
      totalPayment = monthlyPayment * months;
    } else {
      setError("Calculation error. Please check the input data.");
      return;
    }

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-4 font-plus-jakarta">
      <form
        onSubmit={calculateRepayments}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mb-6"
      >
        <h2 className="text-xl font-bold mb-6">Mortgage Calculator</h2>

        <InputField
          label="Mortgage Amount"
          value={amount}
          onChange={setAmount}
          error={error && !amount}
          placeholder="£"
        />
        <InputField
          label="Mortgage Term"
          value={term}
          onChange={setTerm}
          error={error && !term}
          placeholder="Years"
          suffix="years"
        />
        <InputField
          label="Interest Rate"
          value={rate}
          onChange={setRate}
          error={error && !rate}
          placeholder="Rate"
          suffix="%"
        />

        <div className="mb-6">
          <label className="block mb-2 text-slate-700">Mortgage Type</label>
          <div className="flex gap-4">
            {["repayment", "interestOnly"].map((val) => (
              <label key={val} className="flex items-center">
                <input
                  type="radio"
                  value={val}
                  checked={type === val}
                  onChange={(e) => setType(e.target.value)}
                  className="mr-2"
                />
                {val === "repayment" ? "Repayment" : "Interest Only"}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-lime text-white rounded font-bold hover:bg-lime-700 transition duration-300"
        >
          Calculate Repayments
        </button>
      </form>

      {error && <div className="text-red mb-4">{error}</div>}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center"
          >
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-100 p-4 rounded">
                <p className="text-slate-900 font-semibold">Monthly Payment</p>
                <p className="text-slate-700">£{result.monthlyPayment}</p>
                <p className="text-slate-900 font-semibold">Total Payment</p>
                <p className="text-slate-700">£{result.totalPayment}</p>
                <p className="text-slate-900 font-semibold">Total Interest</p>
                <p className="text-slate-700">
                  £{(result.totalPayment - amount).toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Utility component for input fields
const InputField = ({ label, value, onChange, error, placeholder, suffix }) => (
  <div className="mb-4">
    <label className="block mb-2 text-slate-700">{label}</label>
    <div className="flex">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-${suffix ? "1/2" : "full"} p-2 border rounded ${
          error ? "border-red" : "border-slate-300"
        }`}
        placeholder={placeholder}
      />
      {suffix && (
        <span className="self-center ml-2 text-slate-700">{suffix}</span>
      )}
    </div>
  </div>
);

export default MortgageCalculator;
