import {useContext} from 'react'
import CartContext from '../../context/CartContext';

const CartItem = ({ 
  // CartItem receives two props; i) cartItems (an array of product objects passed down from App.jsx) and ii) cartItemCounts (a type number tracking the quantities of individual items added to the cart.)
  cartItems = useContext(CartContext), // cartState
  cartItemCounts = useContext(CartContext), // counts
  handleAddToCart = useContext(CartContext), // handleAddToCart()
  handleRemoveFromCart = useContext(CartContext) // handleRemoveFromCart()
}) => {
  // A guard clause that returns null if there are no cart items or if the array is empty, preventing unneccessary rendering (best practice as negates rendering waste)
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  // console.log('cartItemCounts in CartItem.jsx', cartItemCounts)

  return (
    // A React fragment
    <>
      {/* A chained .filter() to .map() operation called on the cartItems array of objects: */}
      {cartItems
      // .filter() returns a shallow copy - a copy whose properties share the same references (point to the same underlying values) as those of the source object - of a portion of a given array.
      // The original and the copy are related, so that changes to either affect the other. 
      // In this example, the array of objects, cartItems, is copied and a portion of that array is returned, filtered down to the args we pass to filter.
      // This .filter() example implements duplicate removal by comparing item names, keeping only the first occurence of each unique item name via the findIndex() array function (which returns the index of the first element in an array that satisfies the testing function).
        .filter((item, index, self) => 
          index === self.findIndex(t => t.name === item.name)
        )
        // We now .map() over the filtered (de-duped) shallow copy of the original cartItems array of objects, and render a container div for each item (possibly wrapping a CartItem component), storing all <div>s in an array
        .map((item, _) => (
          <div className='cart-product-container' key={item.name}>
            <img
              className='cart-product-card-image'
              src={item.image || '/no-image-placeholder-image.svg'}
              alt={item.name || 'No product image found'}
            />
            <div className='cart-product-card-details-parent'>
              <div className='cart-product-card-details-child'>
                <div className='cart-product-card-name'>{item.name}</div>
                <div className='cart-product-card-price'>${Number(item.price).toFixed(2)}</div>
                <div className='cart-product-card-quantity-and-buttons'>
                  {/* The '-' button: */}
                  <button 
                    onClick={() => {
                      handleRemoveFromCart(item);
                    }}>-</button>
                  <div><strong>{cartItemCounts[item.name]}</strong></div>
                  {/* The '+' button */}
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default CartItem
