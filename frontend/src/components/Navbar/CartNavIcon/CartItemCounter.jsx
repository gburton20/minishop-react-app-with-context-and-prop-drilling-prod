import { useContext } from 'react';
import CartContext from '../../../context/CartContext';

const CartItemCounter = () => {
  const { navCartAddCount } = useContext(CartContext);

  return (
    <div className='cart-item-counter'>
      {navCartAddCount}
    </div>
  );
};

export default CartItemCounter;