import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useCart } from "../useContext/CartContext";
import { getProductsFireStore } from "../API/firestore.js";
import EcommerceCard from "../components/ecommerce-page/EcommerceCard";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Cart = () => {
  const { cart, updateCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProductsFireStore();
      const filteredCart = response.filter((product) =>
        Object.keys(cart).includes(product.id.toString())
      );
      setProducts(filteredCart);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  }, [cart]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleRemove = useCallback(
    (productId) => {
      updateCart(productId, -1);
      toast.error("Item removed from cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    [updateCart]
  );

  const totalCost = useMemo(() => {
    return products.reduce(
      (total, product) => total + product.price * (cart[product.id] || 0),
      0
    );
  }, [products, cart]);

  // Calcolo delle quantità totali e dei prodotti unici
  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((total, qty) => total + qty, 0);
  }, [cart]);

  const totalProducts = useMemo(() => {
    localStorage.getItem("cart");
    return Object.keys(cart).length;
  }, [cart]);
  const empty = () => {
    localStorage.removeItem("cart");
    toast.error("Cart emptied", { position: "top-right" });
    setProducts([]);
    window.location.reload();
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row p-4 items-center justify-between gap-4 mt-4 mb-4 bg-blue-50 shadow-md rounded-lg">
        <h1 className="text-3xl font-extrabold text-gray-800">Cart</h1>
        <p className="text-lg text-gray-600">
          Items in cart: {totalItems} {/* Quantità totale di articoli */}
        </p>
        <p className="text-lg text-gray-600">
          Number of Products: {totalProducts} {/* Numero di prodotti unici */}
        </p>
        <button
          onClick={empty}
          className="bg-red text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition transform hover:scale-105 shadow-md"
        >
          Svuota carrello
        </button>
        <p className="text-lg text-gray-600">Total: ${totalCost.toFixed(2)}</p>
        <Link to="/exercise/fakeecommerce">
          <button className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition transform hover:scale-105 shadow-md">
            Back to Shop
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-6 p-4 justify-center">
            {products
              .filter((product) => cart[product.id] > 0) // Filtriamo i prodotti con quantità maggiore di zero
              .map((product) => (
                <motion.div
                  key={product.id}
                  className="relative w-full sm:w-60"
                >
                  <EcommerceCard
                    product={product}
                    quantity={cart[product.id]}
                    onIncrease={() => updateCart(product.id, 1)}
                    onDecrease={() => handleRemove(product.id)}
                    onAddToCart={(product, quantity) =>
                      updateCart(product.id, quantity)
                    }
                  />
                </motion.div>
              ))}
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-200 rounded shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold">Summary</h2>
        <ul className="list-disc list-inside">
          {products.map((product) => (
            <li key={product.id} className="truncate">
              {product.name} - {cart[product.id]} x ${product.price} = $
              {cart[product.id] * product.price}
            </li>
          ))}
        </ul>
        <h3 className="text-lg font-bold mt-2">
          Total Cost: ${totalCost.toFixed(2)}
        </h3>
      </div>
      <ToastContainer />
    </>
  );
};

export default Cart;
