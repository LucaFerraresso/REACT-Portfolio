import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EcommerceCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-2 justify-between border border-black hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 mx-auto w-full sm:w-60 h-auto"
      whileHover={{ scale: 1.05 }}
    >
      <Link to={`/exercise/fakeecommerce/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 border border-black rounded-t-lg"
          style={{ borderRadius: "0.5rem 0.5rem 0 0", marginBottom: "-1px" }}
        />
      </Link>
      <div className="p-2 flex flex-col items-center justify-center">
        <h2 className="text-rose-900 text-lg font-semibold mb-1 border-b border-black pb-2 transition-colors duration-300 hover:text-rose-700">
          {product.name}
        </h2>
        <p className="text-rose-500 mb-2">Category: {product.category}</p>
        <p className="text-green-600 text-xl font-bold mb-4">
          Price: ${product.price}
        </p>
        <div className="flex items-center mb-4">
          <button
            onClick={handleDecrease}
            className="bg-rose-500 text-white px-3 py-1 rounded-l border border-black hover:bg-rose-600 transition"
          >
            -
          </button>
          <span className="mx-2 text-lg font-medium">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="bg-rose-500 text-white px-3 py-1 rounded-r border border-black hover:bg-rose-600 transition"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onAddToCart(quantity)}
          className="w-full py-2 rounded-lg transition text-white font-bold border border-black bg-green-500 hover:bg-green-600"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default EcommerceCard;
