import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email address is invalid";
    if (!formData.queryType) newErrors.queryType = "Query type is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.consent)
      newErrors.consent = "You must consent to be contacted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        queryType: "",
        message: "",
        consent: false,
      });
      setErrors({});
      setTimeout(() => setIsSuccess(false), 3000); // Hide message after 3 seconds
    }
  };

  const InputField = ({
    id,
    name,
    type = "text",
    label,
    value,
    error,
    ...props
  }) => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-grey-900 mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          className={`w-full p-3 border ${
            error ? "border-red" : "border-grey-500"
          } rounded-lg`}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          className={`w-full p-3 border ${
            error ? "border-red" : "border-grey-500"
          } rounded-lg`}
          {...props}
        />
      )}
      {error && <p className="text-red mt-2">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-grey-900 flex items-center justify-center p-4 font-karla">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-grey-900">Contact Us</h2>

        {isSuccess && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-green-600 mb-4"
          >
            Your message has been sent successfully!
          </motion.p>
        )}

        <div className="flex flex-row gap-4 mb-4">
          <InputField
            id="firstName"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            error={errors.firstName}
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            error={errors.lastName}
          />
        </div>

        <InputField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          error={errors.email}
        />

        <div className="mb-4">
          <p className="text-grey-900 mb-2">Query Type</p>
          <div className="flex flex-row gap-4">
            {["general", "support"].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  name="queryType"
                  value={type}
                  checked={formData.queryType === type}
                  onChange={handleChange}
                  className="mr-2"
                />
                {type === "general" ? "General Enquiry" : "Support Request"}
              </label>
            ))}
          </div>
          {errors.queryType && (
            <p className="text-red mt-2">{errors.queryType}</p>
          )}
        </div>

        <InputField
          id="message"
          name="message"
          type="textarea"
          label="Message"
          value={formData.message}
          error={errors.message}
        />

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2"
            />
            I consent to be contacted
          </label>
          {errors.consent && <p className="text-red mt-2">{errors.consent}</p>}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded-lg w-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
