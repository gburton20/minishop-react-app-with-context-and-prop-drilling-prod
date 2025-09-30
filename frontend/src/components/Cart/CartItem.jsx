import {useContext} from 'react'
import CartContext from '../../context/CartContext';

const CartItem = ({ 
  cartItems = useContext(CartContext), 
  cartItemCounts = useContext(CartContext), 
  handleAddToCart = useContext(CartContext), 
  handleRemoveFromCart = useContext(CartContext) 
}) => {
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  return (
    <>
      {cartItems
        .filter((item, index, self) => 
          index === self.findIndex(t => t.name === item.name)
        )
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
                  <button 
                    onClick={() => {
                      handleRemoveFromCart(item);
                    }}>-</button>
                  <div><strong>{cartItemCounts[item.name]}</strong></div>
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
