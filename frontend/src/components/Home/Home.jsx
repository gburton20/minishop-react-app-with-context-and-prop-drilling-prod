import { useContext, useEffect, useState } from 'react'
import ProductFilter from './ProductFilter'
import SellProductForm from './SellProductForm'
import BannerAdContainer from './BannerAdContainer'
import ProductCardsList from './ProductCardsList/ProductCardsList'
import SellProductButton from './SellProductButton'
import { useAuth0 } from "@auth0/auth0-react";
import CartContext from '../../context/CartContext'


const Home = ({
  handleAddToCart = useContext(CartContext)}) => {

  // START OF STATE SECTION:

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customProducts, setCustomProducts] = useState([]);

  // END OF STATE SECTION

  // START OF AUTH0 SECTION:

  const { isAuthenticated } = useAuth0();
  
  // END OF AUTH0 SECTION
  
  // START OF LOGIC SECTION FOR SELLPRODUCTFORM.JSX:
  
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  
  const handleAddProduct = (newProduct) => {
    const newProductWithId = {
      ...newProduct,
      id: Date.now() + Math.random()
    };
    setProducts([...products, newProductWithId]);
  }
  
  // END OF LOGIC SECTION FOR SELLPRODUCTFORM.JSX
  
  // START OF LOGIC SECTION FOR FETCHING PRODUCTS:

  useEffect(() => {
    const fetchThirdPartyProducts = async () => {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const fetchedProducts = await response.json();
      setProducts(fetchedProducts);
    };
    fetchThirdPartyProducts();
  }, []);
  
  useEffect(() => {
    const fetchCustomProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products/');
        if (response.ok) {
          const data = await response.json();
          setCustomProducts(data.results || data); 
        }
      } catch (err) {
        console.error('Error fetching custom products:', err);
      }
    };
    fetchCustomProducts();
  }, []);
  // END OF LOGIC SECTION FOR FETCHING PRODUCTS
  
  // START OF LOGIC SECTION FOR THE COMBINATION OF 3RD-PARTY AND USER-GENERATED PRODUCTS:
  
  const allProducts = [
    ...products.map(product => ({
      category: product.category ? product.category.name : null,
      id: product.id,
      image: product.images && product.images.length > 0 ? product.images[0] : '',
      name: product.title,
      price: product.price
    })),
    ...customProducts.map(product => ({
      category: product.category,
      id: product.id ? `custom-${product.id}` : `custom-fallback-${product.idx}`,
      image: product.image
      ? `http://localhost:8000${product.image}`
      : '',      
      name: product.name,
      price: product.price
    }))
  ];  
  // END OF LOGIC SECTION FOR THE COMBINATION OF 3RD-PARTY AND USER-GENERATED PRODUCTS
  
  // START OF LOGIC SECTION FOR PRODUCTFILTER.JSX:

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName)
  }

  const filteredProducts = selectedCategory === 'All'
    ? allProducts 
  : allProducts.filter(product => {
      return product.category === selectedCategory;
    });

  // END OF LOGIC SECTION FOR PRODUCTFILTER.JSX

  return (
    <div className='home'>
      <ProductFilter
        onCategoryChange={handleCategoryChange}
      />
        {isAuthenticated && <SellProductButton onClick={openForm}/>}
        {isFormOpen && <SellProductForm 
          handleAddProduct={handleAddProduct}
          closeForm={closeForm} 
          isFormOpen={isFormOpen}
          setCustomProducts={setCustomProducts}
        />}
        <BannerAdContainer/>
        <ProductCardsList
          products={filteredProducts}
          handleAddToCart={handleAddToCart}
        />
    </div>
  )
}

export default Home