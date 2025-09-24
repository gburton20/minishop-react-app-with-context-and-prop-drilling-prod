import { createContext, useEffect, useState } from "react";

// Create the context:
const CartContext = createContext();

// Provider component:
export const CartProvider = ({ children }) => {
  const [navCartAddCount, setNavCartAddCount] = useState(0);

  const [cartState, setCartState] = useState(() => {
    const saved = localStorage.getItem('Cart');
    if (saved === null) {
      localStorage.setItem('Cart', JSON.stringify([]));
    }
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cartState));
  }, [cartState]);

  const handleAddToCart = (product) => {
    setCartState(prevCartState => [...prevCartState, product]);
    setNavCartAddCount(previousCount => previousCount + 1);
  };

  const handleRemoveFromCart = (productToRemove) => {
    setCartState(prevCartState => {
      const indexOfProductToRemove = prevCartState.findIndex(product => product.name === productToRemove.name);
      if (indexOfProductToRemove !== -1) {
        setNavCartAddCount(prevCount => Math.max(prevCount - 1, 0));
        return [
          ...prevCartState.slice(0, indexOfProductToRemove),
          ...prevCartState.slice(indexOfProductToRemove + 1)
        ];
      }
      return prevCartState;
    });
  };

  const counts = cartState.reduce((acc, product) => {
    acc[product.name] = (acc[product.name] || 0) + 1;
    return acc;
  }, {});

  const sumOfCartItems = cartState.reduce((acc, product) => acc + Number(product.price), 0);

  const numOfProductsInCart = cartState.length;

  useEffect(() => {
  }, [cartState]);

  return (
    <CartContext.Provider
      value={{
        navCartAddCount,
        cartState,
        setCartState,
        setNavCartAddCount,
        handleAddToCart,
        handleRemoveFromCart,
        counts,
        sumOfCartItems,
        numOfProductsInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;