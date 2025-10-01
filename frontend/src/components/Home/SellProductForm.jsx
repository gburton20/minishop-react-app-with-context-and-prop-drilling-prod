import { useEffect, useRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react';

const SellProductForm = ({
  handleAddProduct,
  closeForm,
  isFormOpen,
  setCustomProducts
}) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // START OF SECTION TO HANDLE THE USER CLOSING THE FORM:
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeForm();
      }
    }
    if (isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isFormOpen, closeForm]);

  useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') {
        closeForm();
      }
    }
    if (isFormOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isFormOpen, closeForm]);

  // END OF SECTION TO HANDLE THE USER CLOSING THE FORM:

  // START OF SECTION TO HANDLE THE FORM SUBMISSION:
  const formSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const imageInput = form.querySelector('.sell-product-image-input-field');
    const imageFile = imageInput && imageInput.files && imageInput.files[0] ? imageInput.files[0] : null;
    
    const formData = new FormData();
    formData.append('name', form.querySelector('.sell-product-name-input-field').value);
    formData.append('category', form.querySelector('.sell-product-category-dropdown').value);
    formData.append('price', form.querySelector('.sell-product-price-input-field').value);
    if (imageFile) {
      formData.append('image', imageFile);
    }      
    setCustomProducts(prev => [...prev, formData]);
    if (isAuthenticated) {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://dev-ngpva7twomewnfum.us.auth0.com/api/v2/",
            scope: "openid profile email",
          },
        });
        await fetch("http://localhost:8000/products/", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
          body: formData,
        });
      } catch (err) {
        console.error("Error posting product:", err);
      }
    }
    handleAddProduct(formData);
    closeForm();
  };

  // END OF SECTION TO HANDLE THE FORM SUBMISSION:

  return (
    <>
      <form 
        className={`sell-product-modal-form-overlay${isFormOpen ? ' active' : ''}`}
        onClose={closeForm}
        onSubmit={formSubmit}
      >
        <div 
          className='sell-product-modal-form-content'
          ref={modalRef}
        >
          <div className='sell-product-modal-form-close-button-container'>
            <div
              className='sell-product-modal-form-close-button' 
              onClick={closeForm} 
              style={{cursor: 'pointer'}}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Close">
                  <line x1="4" y1="4" x2="16" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="16" y1="4" x2="4" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div> {/* End of sell-product-modal-form-close-button */}
          </div> {/* End of sell-product-modal-form-close-button-container */}

          {/* Product name */}
          <div className='sell-product-name-field-title'>Product name:
            <input 
              className='sell-product-name-input-field'
              placeholder='Enter your product name here'/>
          </div> 
          {/* Product category: */}
          <div className='sell-product-category-field-title'>
            Product category:
            <select className='sell-product-category-dropdown'>
              <option value="Clothes">Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Shoes">Shoes</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          {/* Product price: */}
          <div className='sell-product-price-field-title'>Price ($):
            <input 
              className='sell-product-price-input-field'
              placeholder='Enter your price here'/>
          </div>
          {/* Product image */}
          <div className='sell-product-image-field-title'>
            Product image:
            <input
              className='sell-product-image-input-field'
              type="file"
              accept="image/*"
              name="productImage"
            />
          </div>
          <button className='submit-product-for-sale-button'>
            Post your product for sale on Minishop
          </button>
        </div> {/* End of sell-product-modal-form-content */}
      </form>
    </>
  )
}

export default SellProductForm