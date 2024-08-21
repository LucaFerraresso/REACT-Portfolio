import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId, quantity) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity,
    }));
  };

  const updateCart = (productId, quantityChange) => {
    setCart((prev) => {
      const newQuantity = (prev[productId] || 0) + quantityChange;
      if (newQuantity <= 0) {
        const newCart = { ...prev };
        delete newCart[productId];
        return newCart;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
