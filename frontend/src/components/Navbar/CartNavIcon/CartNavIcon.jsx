import CartItemCounter from './CartItemCounter'

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