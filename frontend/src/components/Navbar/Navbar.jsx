import { SearchInput } from './SearchInput'
import AuthButton from './Auth/AuthButton'
import CartNavIcon from './CartNavIcon/CartNavIcon'
import { Link } from 'react-router-dom'

// Import the navCartAddCount state (int) from App.jsx
const Navbar = ({navCartAddCount}) => {

  return (
    <>
      <div className='navbar'>
        <Link to="/">
          <h1 className='minishop-logo'>Minishop</h1>
        </Link>
        <SearchInput/>
        <AuthButton/>
        <Link to="/cart">
          <CartNavIcon
            navCartAddCount={navCartAddCount}
          />
        </Link>
      </div>
    </>
  )
}

export default Navbar