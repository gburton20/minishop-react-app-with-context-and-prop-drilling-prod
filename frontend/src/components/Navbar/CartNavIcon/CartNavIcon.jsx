import React from 'react'
import CartItemCounter from './CartItemCounter'

// Import the navCartAddCount state (int) from Navbar.jsx
const CartNavIcon = ({navCartAddCount}) => {
  return (
    <>
      <div className='cart-nav-icon'>
        <img 
          src='./cart-nav-icon.svg'
        />
        <CartItemCounter
          navCartAddCount={navCartAddCount}
        />
      </div>
    </>
  )
}

export default CartNavIcon