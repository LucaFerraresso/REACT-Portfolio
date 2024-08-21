import React, { useEffect, useState, useCallback } from "react";
import EcommerceCard from "../components/ecommerce-page/EcommerceCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useCart } from "../useContext/CartContext";
import { getProductsFireStore } from "../API/firestore";
import { motion } from "framer-motion";

const FakeEcommerce = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useCart();

  const getItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsFireStore();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddToCart = (product, quantity) => {
    if (quantity > 0) {
      addToCart(product.id, quantity);
      toast.success(`${quantity} ${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <div className=" flex  flex-col  justify-center min-h-screen bg-gradient-to-r from-yellow-50 via-green-50 to-blue-50 p-6 text-center items-center font-red-hat">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-center text-4xl font-bold text-blue-900 mb-6 flex justify-between items-center">
        Fake Ecommerce
        <Link to="/exercise/fakeecommerce/cart" className="relative">
          <svg
            className="w-10 h-10 text-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h18l-1.5 9H6L3 3zm3 14h12a3 3 0 003-3H6a3 3 0 003 3z"
            />
          </svg>
          {Object.values(cart).reduce((total, qty) => total + qty, 0) > 0 && (
            <span className="absolute -top-2 -right-2 bg-red text-white rounded-full text-xs px-2 py-1">
              {Object.values(cart).reduce((total, qty) => total + qty, 0)}
            </span>
          )}
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg animate-pulse"
              >
                <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <motion.div key={product.id} className="relative w-full sm:w-72">
                <EcommerceCard
                  product={product}
                  onAddToCart={(quantity) => handleAddToCart(product, quantity)}
                />
              </motion.div>
            ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FakeEcommerce;
