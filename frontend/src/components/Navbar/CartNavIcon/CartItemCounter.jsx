import React from 'react'
import ProductCard from '../../Home/ProductCardsList/ProductCard'

const CartItemCounter = ({navCartAddCount}) => {
  return (
    <>
      <div className='cart-item-counter'>
        {navCartAddCount}
      </div>
    </>
  )
}

export default CartItemCounter