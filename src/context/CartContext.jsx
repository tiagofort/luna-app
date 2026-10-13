import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  
const addToCart = (product) => {
  setCart((prevCart) => {
    const normalizedProduct = {
      ...product,
      quantity: Number(product.quantity) || 1,
      image:
        product.image ||
        product.imageUrl ||
        product.midia?.url1 ||
        null,
    };

    const existingItem = prevCart.find(
      (item) => item._id === normalizedProduct._id
    );

    if (existingItem) {
      return prevCart.map((item) =>
        item._id === normalizedProduct._id
          ? {
              ...item,
              quantity:
                (Number(item.quantity) || 0) +
                normalizedProduct.quantity,
              image: item.image || normalizedProduct.image,
            }
          : item
      );
    }

    return [...prevCart, normalizedProduct];
  });
};


  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
