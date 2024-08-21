import React, { useEffect, useState, useCallback } from "react";
import EcommerceCard from "../components/ecommerce-page/EcommerceCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useCart } from "../useContext/CartContext";
import { getProductsFireStore } from "../API/firestore";

const FakeEcommerce = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();

  const getItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProductsFireStore();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
    <div className="min-h-screen bg-rose-50 p-4 text-center items-center font-red-hat">
      <h1 className="text-center text-3xl font-bold text-rose-900 mb-6 flex justify-between items-center">
        Fake Ecommerce
        <Link to="/exercise/fakeecommerce/cart" className="relative">
          <svg
            className="w-8 h-8 text-rose-900"
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
            <span className="absolute -top-1 -right-1 bg-red text-white rounded-full text-xs px-1">
              {Object.values(cart).reduce((total, qty) => total + qty, 0)}
            </span>
          )}
        </Link>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-300 animate-pulse rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 animate-pulse rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 animate-pulse rounded"></div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <EcommerceCard
                key={product.id}
                product={product}
                onAddToCart={(quantity) => handleAddToCart(product, quantity)}
              />
            ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FakeEcommerce;
