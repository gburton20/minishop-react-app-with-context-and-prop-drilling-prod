import { useContext } from 'react'
import CartContext from '../../../context/CartContext'

// Import the following props from ProductCardList.jsx, the first component in which they are created (via the API call) :
const ProductCard = ({
    category,
    image, 
    name, 
    price
}) => {
    // Use context inside the component body
    const { handleAddToCart } = useContext(CartContext);
    return (
        // React fragments act as the root level element in this return statement, allowing multiple child elements to be returned within their boundaries
        <>
            <div className='product-card-container'>
                {image ? (
                    <img className='product-card-image' src={image} alt={name} />
                ) : null}                
                <div className="product-card-name">{name}</div>
                {/* Convert the price prop to a currency number with two decimal places. Two-step data transformation of: 1) Number(price) converts price into a Number data type and 2) .toFixed(2) called on that new Number data type of number, always displays a version of price (data type Number) with two decimal places. The '$' is hardcoded, and there is currently no handling missing or invalid price values from the API */}
                <div className="product-card-price">${Number(price).toFixed(2)}</div>
                <button
                    className='product-card-add-to-cart-button'
                    // The onClick event triggers when the user clicks this button. 
                    // An anonymous arrow function is used here to allow passing arguments and executing multiple statements, i.e.: creating a new productDataPerClick object and calling handleAddToCart(productDataPerClick). 
                    // Note: This approach creates a new function on each render of this ProductCard component, which is generally fine for buttons.
                    onClick={() => {
                        // Each time the onClick event occurs, create an instance of the productDataPerClick object with the following four keys:
                        const productDataPerClick = {
                            category,
                            image,
                            name,
                            price
                        }
                        // For development, log the value of the freshly created productDataPerClick object each time the button is clicked:
                        // console.log('The value of productDataPerClick in ProductCard.jsx each time handleAddToCart is called:', productDataPerClick);
                        // Pass the productDataPerClick object as an argument to handleAddToCart(), which is defined in App.jsx. Each time the button is clicked, handleAddToCart is called with productDataPerClick as an argument.
                        // handleAddToCart updates global states (cartState, navCartAddCount, itemInCartCount) in App.jsx. These updated states are then passed as props to relevant child components throughout the React app, including this component, ProductCard.jsx.
                        handleAddToCart(productDataPerClick);
                    }}
                >
                    Add to cart
                </button>
            </div>
        </>
    )
}

export default ProductCard