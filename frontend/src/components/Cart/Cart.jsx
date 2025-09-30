import {useContext} from 'react'
import CartContext from '../../context/CartContext';
import CartItem from './CartItem'

const Cart = () => {
  const { 
    cartState, 
    setCartState, 
    numOfProductsInCart,
    counts,
    handleAddToCart,
    handleRemoveFromCart,
    sumOfCartItems
  } = useContext(CartContext);

  function getUniqueSortedCartProducts(cartState) {
    return Array.from(
      new Map(cartState.map(product => [product.name, product]))
      .values()
    ).sort((a, b) => a.name.localeCompare(b.name));
  }
  const uniqueSortedCartProducts = getUniqueSortedCartProducts(cartState);

  const safeNumOfProductsInCart = Number(numOfProductsInCart) || 0;

  return (
    <>
      <div className='cart'>
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
                  cartItemCounts={counts}
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