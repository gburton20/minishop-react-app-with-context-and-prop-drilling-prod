import { useContext } from 'react'
import CartContext from '../../../context/CartContext'

const ProductCard = ({
    category,
    image, 
    name, 
    price
}) => {
    const { handleAddToCart } = useContext(CartContext);
    return (
        <>
            <div className='product-card-container'>
                {image ? (
                    <img className='product-card-image' src={image} alt={name} />
                ) : null}                
                <div className="product-card-name">{name}</div>
                <div className="product-card-price">${Number(price).toFixed(2)}</div>
                <button
                    className='product-card-add-to-cart-button'
                    onClick={() => {
                        const productDataPerClick = {
                            category,
                            image,
                            name,
                            price
                        }
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