import { useEffect, useState } from 'react'
import ProductCard from './ProductCard';

// "https://api.escuelajs.co/api/v1/products"

const ProductCardsList = ({
  products,
  handleAddToCart,
}) => {

  // Product fetching logic moved to Home.jsx

  return (
    <div className="product-cards-list">
      {products.map((product) => (
        <ProductCard
          category={product.category}
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductCardsList