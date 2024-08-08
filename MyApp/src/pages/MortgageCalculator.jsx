import React, { useState } from "react";

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

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = amount / months;
      totalPayment = Number(amount);
    } else {
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      if (denominator === 0) {
        setError("Errore nei calcoli. Controlla i dati inseriti.");
        return;
      }
      monthlyPayment =
        amount *
        monthlyRate *
        (Math.pow(1 + monthlyRate, months) / denominator);
      totalPayment = monthlyPayment * months;
    }

    const calculatedResult = {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
    };

    setResult(calculatedResult);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate100 p-4 font-plus-jakarta">
      <form
        onSubmit={calculateRepayments}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mb-6"
      >
        <h2 className="text-xl font-bold mb-6">Mortgage Calculator</h2>
        <div className="mb-4">
          <label className="block mb-2 text-slate700">Mortgage Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full p-2 border rounded ${
              error && !amount ? "border-red" : "border-slate300"
            }`}
            placeholder="£"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-slate700">Mortgage Term</label>
          <div className="flex">
            <input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className={`w-1/2 p-2 border rounded ${
                error && !term ? "border-red" : "border-slate300"
              }`}
              placeholder="Years"
            />
            <span className="self-center ml-2 text-slate700">years</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-slate700">Interest Rate</label>
          <div className="flex">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className={`w-1/2 p-2 border rounded ${
                error && !rate ? "border-red" : "border-slate300"
              }`}
              placeholder="Rate"
            />
            <span className="self-center ml-2 text-slate700">%</span>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-slate700">Mortgage Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="repayment"
                checked={type === "repayment"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Repayment
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="interestOnly"
                checked={type === "interestOnly"}
                onChange={(e) => setType(e.target.value)}
                className="mr-2"
              />
              Interest Only
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-lime text-white rounded font-bold hover:bg-lime transition duration-300"
        >
          Calculate Repayments
        </button>
      </form>

      {error && <div className="text-red mb-4">{error}</div>}

      {result && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-slate100 p-4 rounded">
              <p className="text-slate900 font-semibold">Monthly Payment</p>
              <p className="text-slate700">£{result.monthlyPayment}</p>
              <p className="text-slate900 font-semibold">Total Payment</p>
              <p className="text-slate700">£{result.totalPayment}</p>
              <p className="text-slate900 font-semibold">Total Interest</p>
              <p className="text-slate700">
                £{(result.totalPayment - amount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
