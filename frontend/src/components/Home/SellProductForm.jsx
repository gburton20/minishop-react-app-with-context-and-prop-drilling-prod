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

  // Declare a ref variable using the useRef hook initialised to null
  // The purpose of this ref is to check if a click event occured outside the modal by comparing event targets with modalRef.current
  const modalRef = useRef(null);

  // Declare a useEffect function to handle closing the modal when clicking outside of it:
  useEffect(() => {
    // Declare a handler function for the user clicking outside of the modal to close it:
    function handleClickOutside(event) {
      // If the location of the click occured outside the modal (i.e. e.target != modalRef), call closeForm()
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeForm();
      }
    }
    // If isFormOpen === true, add an event listener to the document which will listen for mousedown events and call handleClickOutside() if a mousedown event is detected:
    if (isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // The return statement for this useEffect function. If isFormOpen === false, remove the now redundant event listener, as the form is closed, and maintaining the event listener is inefficient 
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  // This useEffect function's dependency array is set up so that this useEffect will run initially on mount, and again when either of these two values, a boolean and a the return value of a function, change 
  }, [isFormOpen, closeForm]);

  // Declare a useEffect function to handle closing the modal when pressing the Escape button:
  useEffect(() => {
    // Declare an event handler function, handleEsc.
    function handleEsc(event) {
      // If the key object of the event strictly equals 'Escape'
      if (event.key === 'Escape') {
        // Call closeForm()
        closeForm();
      }
    }
    // Only if isAuthModalOpen is true, i.e. the AuthModal.jsx component is open and on screen, add an event listener. The trigger event will be a user's 'keydown', and it will call handleEsc(). To reach this part of the code, the event.key has to === 'Escape', and so we do not need to redeclare the key's value here:
    if (isFormOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    // The return statement for this useEffect() function. This return statement handles the 'clean up' of side effects, namely the removal of the event listener when the component unmounts or dependencies change: 
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  // This useEffect function's dependency array has two values passed to it: 1) isAuthModalOpen and ii) closeModal. This setup ensures that this useEffect will run initially on mount and then whenever either of these values change. closeModal is included here because it could change (for example, if redefined in a parent component):
  }, [isFormOpen, closeForm]);

  // console.log('isFormOpen rendered, isFormOpen:', isFormOpen);

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
    // console.log('Form submitted! Here is the new formData for this UGC-product:', formData);
    // If the user is authenticated, logged in, 
    if (isAuthenticated) {
      // Try to create an access token relevant to the auth0 URL for this user
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://dev-ngpva7twomewnfum.us.auth0.com/api/v2/",
            scope: "openid profile email",
          },
        });
        // The API endpoint /products (POST) is protected by JWT authentication:
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
    // console.log('Price-only rendering issue, 1st debug log, formData', formData)
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
              {/* SVG 'x' icon */}
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