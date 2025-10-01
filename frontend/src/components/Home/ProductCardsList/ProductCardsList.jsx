import ProductCard from './ProductCard';

const ProductCardsList = ({
  products,
  handleAddToCart,
}) => {

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