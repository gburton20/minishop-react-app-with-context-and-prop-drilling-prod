import {useContext} from 'react'
import CartContext from '../../context/CartContext';
import CartItem from './CartItem'

const Cart = ({
  // Used locally in Cart.jsx only:
  setCartState = useContext(CartContext),
  numOfProductsInCart = useContext(CartContext),
  cartState = useContext(CartContext)
}) => {
// console.log(sumOfCartItems)
  // getUniqueSortedCartProducts()'s purpose is to return a new array of objects from a newly created Map object, where each object in that array is unique and alphabetised by the value of its stringified product.name value. 
  // The Map object's keys are each a unique product name, and their value pair is the product object associated with that unique product name. 
  function getUniqueSortedCartProducts(cartState) {
    // 'Array.from()' is a JS method which creates a new shallow-copy array from an array-like object. In this context, the array-like object from which the shallow-copy array is derived is the Map object.
    // In this context, 'Array.from()' converts the iterator returned by .values() into an array
    return Array.from(
      // 'new Map()' refers to the creation of a new Map object in JS.
      // A Map is an object that remembers the original insertion order of the keys in the object's key-value pairs
      // Unlike normal objects, Map objects allow keys of any data type making them useful for CRUD operations
      // Only the last instance of the product object with a unique product.name key is added to the new array
      // This Map object's keys are the product.names, and their values are the corresponding products
      // cartItems.map() creates [product.name, product] key-value pairs for the Map object. 
      // product.name is the key, and product is the value.
      new Map(cartState.map(product => [product.name, product]))
      // A .values() method is called on the returned Map object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values). 
      // Because .values() is called on a Map object, its behaviour is different to if it was called on a regular object (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
      // The .values() method returns an iterator of product objects from the preceding Map object, which now only contains one product object value per unique product.name key
      .values()
    // The .sort() method sorts the elements of the array from 'return Array.from'. 
    // The standard params for .sort(), 'a' (the first element for comparison) and 'b' (the second element for comparison) are passed to the .sort() method. 
    // Because the default value is ascending, this process will alphabetise the stringified product.name values in the array.
    // The .sort() will mutate the original array returned by .'return Array.from', sorting the products by the alphabetic order of their 'name' value.
    // The .localeCompare() method returns a number indicating whether the string being compared comes before or after or is the same as the given string in sort order.
    ).sort((a, b) => a.name.localeCompare(b.name));
  }
  // uniqueSortedCartProducts is assigned to the returned value of getUniqueSortedCartProducts being called with the paremeter of cartItems, itself a local variable of the global cartState array of objects variable defined in App.jsx:
  // In this context, an array of singular, unique, product objects is returned.
  const uniqueSortedCartProducts = getUniqueSortedCartProducts(cartState);
  // console.log('uniqueSortedCartProducts', uniqueSortedCartProducts)

  const safeNumOfProductsInCart = Number(numOfProductsInCart) || 0;

  return (
    <>
      <div className='cart'>
        {/* <Navbar/> */}
        <div className='cart-container'>
          <div className='cart-title-and-clear-cart-button-container'>
            <div className='cart-title'>You've added <strong>{numOfProductsInCart} items</strong> to your cart! 🛒</div>
            <button className='clear-cart-button' onClick={() => setCartState([])}>Clear cart</button>
          </div>
          {safeNumOfProductsInCart > 0 && (
            <div className='cart-product-and-summary-container'>
              <div className='cart-product-list'>
                <CartItem
                  cartItems={uniqueSortedCartProducts}
                  cartItemCounts={cartItemCounts}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </div> {/* End of cart-product-list */}
              <div className='cart-order-summary-container'>
                <div className='cart-order-summary-breakdown'>
                  <div className='cart-order-total-container'>
                    <div className='cart-order-total-value'><strong>TOTAL: ${Number(sumOfCartItems).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
                    <button className='cart-proceed-to-checkout-button' onClick={() => window.alert(`Your cart total is: $${Number(sumOfCartItems).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)}>Proceed to Checkout</button>
                  </div> {/* End of cart-order-total-container */}
                </div> {/* End of cart-order-summary-breakdown */}
              </div> {/* End of cart-order-summary-container */}
            </div>
            )}     
        </div> {/* End of cart-container */}
      </div> {/* End of cart */}
    </>
  )
}

export default Cart