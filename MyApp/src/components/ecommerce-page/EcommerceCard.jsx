import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EcommerceCard = ({
  product,
  quantity,
  onAddToCart,
  onIncrease,
  onDecrease,
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity || 1);

  const handleIncrease = () => {
    setLocalQuantity((prev) => prev + 1);
    onIncrease && onIncrease();
  };

  const handleDecrease = () => {
    if (localQuantity === 1) {
      onDecrease && onDecrease(); // Chiama la funzione di decremento senza aggiornare localQuantity
    } else if (localQuantity > 1) {
      setLocalQuantity((prev) => prev - 1);
      onDecrease && onDecrease();
    }
  };

  const handleAddToCart = () => {
    onAddToCart && onAddToCart(localQuantity);
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-2 justify-between border border-gray-200 hover:shadow-2xl transition-shadow duration-300  mx-auto w-full sm:w-60 h-auto"
      whileHover={{ scale: 1.05 }}
    >
      <Link to={`/exercise/fakeecommerce/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded-t-lg"
        />
      </Link>
      <div className="p-2 flex flex-col items-center">
        <h2 className="text-gray-900 text-lg font-semibold mb-1 border-b border-gray-300 pb-2 transition-colors duration-300 hover:text-gray-700">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-2">Category: {product.category}</p>
        <p className="text-green-600 text-xl font-bold mb-4">
          Price: ${product.price}
        </p>
        <div className="flex items-center mb-4">
          <button
            onClick={handleDecrease}
            className="bg-red text-white px-3 py-1 rounded-l border border-gray-300 hover:bg-rose-800 transition transform hover:scale-105"
          >
            -
          </button>
          <span className="mx-2 text-lg font-medium">{localQuantity}</span>
          <button
            onClick={handleIncrease}
            className="bg-green text-white px-3 py-1 rounded-r border border-gray-300 hover:bg-green-600 transition transform hover:scale-105"
          >
            +
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full py-2 rounded-lg bg-blue-500 text-white font-bold border border-gray-300 hover:bg-blue-600 transition transform hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default EcommerceCard;
