  import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const CartContext = createContext();

// Provider component
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

  useEffect(() => {
    // console.log('Current value of the cartState variable in App.jsx:', cartState)
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
        sumOfCartItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;



//   // START of App.jsx's state variables:

//   // Set the navCartAddCount state, with its default value being 0 (number), at the App.jsx level of this app. This state is responsible for transmitting the number of objects of product data (image, name and price) passed from ProductCard.jsx > Home.jsx > App.jsx > Cart.jsx > CartItem.jsx: The state then renders the counter number as a number in the CartItemCounter.jsx component
//   const [navCartAddCount, setNavCartAddCount] = useState(0)
  
//   // Set the default visibility for the user authorisation modal form for this app:
//   // const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  
//   // Set the cartState, with its default value being an empty array, at the App.jsx level of this app. The array is chosen as the default data type so that an the array can be the container for multiple 'product' objects, therefore allowing the management of multiple products. This state is responsible for transmitting product object data (image, name and price) from ProductCard.jsx > Home.jsx > App.jsx > Cart.jsx > CartItem.jsx:  
//   // Set the state for the persistence of cart products between page refreshes. This will be an array of objects, whose functional purpose is to hold only the product objects added to the cart
//   const [cartState, setCartState] = useState(() => {
//     // Initialize the 'Cart' item in localStorage with an empty array if it doesn't exist
//     const saved = localStorage.getItem('Cart');
//     if (saved === null) {
//       localStorage.setItem('Cart', JSON.stringify([]));
//     }
//     // console.log('saved', saved)
//     return saved ? JSON.parse(saved) : [];
//   });

//   // END of App.jsx's state variables

//   // START of localStorage logic:

//   // useEffect to sync cartState to localStorage:
//   useEffect(() => {
//     localStorage.setItem('Cart', JSON.stringify(cartState));
//   }, [cartState]);
//   // END of localStorage logic

//     // START of event handler functions:
  
//     // Declare the handleAddToCart() function. This function in this app is executed EACH TIME the user clicks the <button> element in the ProductCard.jsx component. This function is responsible for updating each of the three global state variables for this app; 1) cartState and 2) navCartAddCount each time it is executed:
//     const handleAddToCart = (product) => {
//       // 1) Functionally update (update within the handleAddToCart parent function) the state of cartState by adding an item into the cartState array. 
//       // 2) [...prevCart, product] - using the spread operator, create a new copy of the original array, the cartState array state, and add the new product object to the end of this array of objects. Creating a new array copy via the spread operator enables React to detect changes between the DOM and virtual DOM. Mutating the existing array wouldn't update the array reference, meaning React wouldn't be able to detect any differences between the DOM and virtual DOM.
//       setCartState(prevCartState => [...prevCartState, product])
//       // Functionally update the local navCartAddCount state with the return value of a callback function. 'prevCount' is just a param name acting as a placeholder variable that represents the previous state's value. React will always pass the current state value as the first argument to your callback function:
//       setNavCartAddCount(previousCount => previousCount + 1)
//     } // End of handleAddToCart()
  
//     // Start of the handleRemoveFromCart() event handler function:
//     // handleRemoveFromCart() accepts a productToRemove product object as a parameter. This product object contains a 'name' key neccessary for the subsequent logic in this function:
//     const handleRemoveFromCart = (productToRemove) => {
//       // console.log('handleRemoveFromCart called for:', productToRemove.name);
//       // Update the cartState variable in an immutable way:
//       setCartState(prevCartState => {
//         // Declare a variable, indexOfProductToRemove, and assign its value to a findIndex() method called on the prevCartState, the current version of the cartState array of objects state variable.
//         // The findIndex() array method returns the index of the FIRST ELEMENT in an array that satisfies the provided testing function. In this case, the testing function is checking the name of the product we want to remove against the name of the existing product within the cartState array of objects:
//         const indexOfProductToRemove = prevCartState.findIndex(product => product.name === productToRemove.name);
//         // If the index of the product we are looking to remove DOES NOT return -1 (type: number), in other words, the findIndex() method finds a matching name between a product and a productToRemove object:
//         if (indexOfProductToRemove !== -1) {
//           // Update the navCartAddCount state variable
//           // Take the previous state value, prevCount, and return a new state value for navCartAddCount.
//           // Use Math.max(prevCount - 1, 0) to decrement the counter by 1 while ensuring it never goes below zero.
//           // Math.max() compares two values, prevCount -1 and 0, and returns the larger one.
//           // This configuration effectively creates a floor value of 0
//           setNavCartAddCount(prevCount => Math.max(prevCount - 1, 0));
//           // The return statement for the nested if statement:
//           // The return values are wrapped in a new array literal, as denoted by the [] brackets. This setup ensures that the returned array items are concatenated into the same flat array:
//           return [ 
//             // Using the spread operator, create a copy of prevCartState array of objects, and perform a .slice() method on it. 
//             // Start at index 0, finish at the index of the product being removed.
//             // Return a shallow copy (a copy whose properties point to the same underlying values as those of the source object from which the copy was made) of a portion of an array:
//             ...prevCartState.slice(0, indexOfProductToRemove),
//             // Create a copy of prevCartState array of objects, and perform a .slice() method on it. 
//             // Start at the index of indexOfProductToRemove + 1m and finish at the end of the array (the default behaviour for .slice() if only one parameter is passed to it):
//             ...prevCartState.slice(indexOfProductToRemove + 1)
//           ];
//         }
//         // console.log(handleRemoveFromCart())
//         return prevCartState; // The return statement for handleRemoveFromCart(), returning the prevCartState array of objects WITHOUT the removed product
//       }); // End of the setCartState() state setter function declared on line 5
//     } // End of handleRemoveFromCart()
  
//     // END of event handler functions
  
//       // START of counts variable declaration:
    
//       // Declare a variable, counts, and assign it the value of the return value of a .reduce() method called on the cartState array of objects state variable.
//       // .reduce() requires a call back function, which is executed on each element within the array, and the accumulator object is updated each time this happens.
//       // .reduce() can process up to four arguments:
//       // 1) accumulator/acc - the accumulated value returned from the previous most recent execution of the callback function.
//       // 2) The currentValue (in this context, each 'product' object)- the current array item being processed in the array.
//       // 3) currentIndex (optional - not used here) - the index of the currentValue in the array
//       // 4) array (optional - not used here) - the original array .reduce() was called upon
//       const counts = cartState.reduce((acc, product) => {
//         // acc[product.id] refers to the 'id' property of the 'product' object in the cartState array of objects. The line below is counting how many times each product ID appears in the array of objects.
//         acc[product.name] = (acc[product.name] || 0) + 1;
//         // Return the accumulator object for the next iteration of this 'counts' callback function. The accumulator object's keys will be the id of each product, and each key's value will be the frequency of those unique objects in the array of objects:
//         return acc;
//       // The empty object below is the initial value for the accumulator value, determining the data type of the accumulator when it is returned:
//       }, {}); 
    
//       // END of counts variable declaration:
    
//       // START of sumOfCartItems
//       // Call the .reduce() method on cartState
//       const sumOfCartItems = cartState.reduce((acc, product) => acc + Number(product.price), 0);
//       // END of sumOfCartItems

//     // START of console log for the current value of cartState:

//     // Log the current value of the cartState array of product objects only when it changes:
//     useEffect(() => {
//     // console.log('Current value of the cartState variable in App.jsx:', cartState)
//     //  ', [cartState] in the line below tells useEffect to run only when there is a change to the global state variable, cartState. That change will be when a new product object is added to or removed from the cartState array.
//     }, [cartState])

//     // END of console log for the current value of cartState:
    
//     export default CartContext