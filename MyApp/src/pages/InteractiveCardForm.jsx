import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InputField = ({ id, label, value, onChange, placeholder, error }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-neutral-dark-grayish-violet mb-2">
      {label}
    </label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full p-2 border rounded ${
        error ? "border-red" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-primary-linear-gradient`}
    />
    {error && <span className="text-red">{error}</span>}
  </div>
);

const InteractiveForm = () => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const { cardholderName, cardNumber, expiryMonth, expiryYear, cvc } =
      formData;
    const newErrors = {};

    if (!cardholderName)
      newErrors.cardholderName = "Cardholder name is required";
    if (!/^\d{16}$/.test(cardNumber))
      newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^(0[1-9]|1[0-2])$/.test(expiryMonth))
      newErrors.expiryMonth = "Valid expiry month is required";
    if (!/^\d{4}$/.test(expiryYear))
      newErrors.expiryYear = "Valid expiry year is required";
    if (!/^\d{3}$/.test(cvc)) newErrors.cvc = "CVC must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Form submitted successfully!");
      resetForm();
    } else {
      toast.error("Please fill out all fields correctly.");
    }
  };

  const resetForm = () => {
    setFormData({
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-dark-grayish-violet flex flex-col justify-center items-center font-spaceGrotesk p-4">
      <h1 className="text-4xl mb-8 text-neutral-very-dark-violet">
        Interactive Card Details Form
      </h1>
      <div className="flex flex-col md:flex-row items-center md:space-x-8 space-y-4 md:space-y-0">
        <div className="relative">
          <img
            src="/Exercises/interactive-card-details-form-main/images/bg-card-front.png"
            alt="Card Front"
            className="w-80"
          />
          <div className="absolute top-8 left-6">
            <span className="text-white text-lg">
              {formData.cardNumber || "0000 0000 0000 0000"}
            </span>
          </div>
          <div className="absolute bottom-8 left-6">
            <span className="text-white text-lg">
              {formData.cardholderName || "Jane Appleseed"}
            </span>
            <span className="text-white text-lg ml-4">
              {formData.expiryMonth || "00"}
            </span>
          </div>
        </div>
        <div className="relative">
          <img
            src="/Exercises/interactive-card-details-form-main/images/bg-card-back.png"
            alt="Card Back"
            className="w-80"
          />
          <div className="absolute top-16 right-8">
            <span className="text-white text-lg">{formData.cvc || "000"}</span>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6 mt-8"
      >
        <InputField
          id="cardholderName"
          label="Cardholder Name"
          value={formData.cardholderName}
          onChange={handleChange("cardholderName")}
          placeholder="e.g. Jane Doe"
          error={errors.cardholderName}
        />
        <InputField
          id="cardNumber"
          label="Card Number"
          value={formData.cardNumber}
          onChange={handleChange("cardNumber")}
          placeholder="e.g. 1234 5678 9123 4567"
          error={errors.cardNumber}
        />
        <div className="flex space-x-4">
          <InputField
            id="expiryMonth"
            label="Expiry Month"
            value={formData.expiryMonth}
            onChange={handleChange("expiryMonth")}
            placeholder="MM"
            error={errors.expiryMonth}
          />
          <InputField
            id="expiryYear"
            label="Expiry Year"
            value={formData.expiryYear}
            onChange={handleChange("expiryYear")}
            placeholder="YY"
            error={errors.expiryYear}
          />
          <InputField
            id="cvc"
            label="CVC"
            value={formData.cvc}
            onChange={handleChange("cvc")}
            placeholder="e.g. 123"
            error={errors.cvc}
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary-input-border text-white rounded-lg hover:bg-primary-input-border transition-colors"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default InteractiveForm;
