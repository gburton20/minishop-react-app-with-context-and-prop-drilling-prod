// Import the useEffect and useState hooks from the React library
// Context was needed here for the Auth0 AP work:
import { useEffect, useState, createContext, useContext } from 'react'
// Re Auth0 API work:
import { useAuth0 } from '@auth0/auth0-react'
// Import the Route and Routes components from react-router-dom, an npm package:
import { Route, Routes } from 'react-router-dom'
// Create a context for this app:
// import { createContext } from 'react'
// Import this app's component files:
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Profile from './components/Profile'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './context/CartContext'
// import AuthModal from './components/AuthModal'

// Re Auth0 API work:
// Create a context for sharing user metadata throughout the application
const UserMetadataContext = createContext(null);
// Custom hook to access the current value of UserMetadataContext
export const useUserMetadata = () => useContext(UserMetadataContext);

function App() {
  // START of Auth0 API logic:
  // Re Auth0 API work:
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [metadata, setMetadata] = useState(null);

  // Logic for testing the inclusion of user_metadata at the 'Checkpoint' section of: https://manage.auth0.com/dashboard/us/dev-ngpva7twomewnfum/applications/kIBq2RIzZx2wagZfhmGOGT7NCUvQCzJX/quickstart/spa/react
  useEffect(() => {
  const getUserMetadata = async () => {
    if (!isAuthenticated) return;
    const domain = "dev-ngpva7twomewnfum.us.auth0.com";
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });
      const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { user_metadata } = await metadataResponse.json();
      setMetadata(user_metadata);
    } catch (e) {
      console.log("Error fetching user_metadata:", e.message);
    }
  };
  getUserMetadata();
}, [isAuthenticated, getAccessTokenSilently, user]);

// END of Auth0 API work

// START of return statement:

  return (
    <>
      <div>
        {/* This line passes user metadata as context throughout this app */}
        <UserMetadataContext.Provider value={metadata}>
          <CartProvider>
          {/* The AuthModal component should sit at a high level in the component tree, so that it isn't unmounted when navigating between routes */}
            {/* {isAuthModalOpen &&
              <AuthModal
                isAuthModalOpen={isAuthModalOpen}
                // setIsAuthModalOpen={setIsAuthModalOpen}
                // We only need to pass closeModal() to the AuthModal, as we will only ever be closing the modal when the modal is open
                closeModal={closeModal}
              />
            } */}
            {/* As the Navbar component will stay persistent in both screens, it doesn't need to be positioned within the Routes component */}
            <Navbar/>
          {/* The <Routes> component is the container for all Route definitions (for React Router v6+). It examines the current URL and renders the best matching route it finds from the child <Route>s nested within it: */}
          <Routes>
            {/* When the URL path BEST MATCHES '/', render the <Home /> component: */}
            <Route 
              path="/" 
              element={<Home 
              />}>
            </Route> {/* End of the first <Route/> */}
            <Route 
              path="/cart" 
              element={<Cart
              />}>
            </Route> {/* End of the second <Route/> */}
            {/* Start of the third route - for the Profile.jsx component */}
            <Route
              path='/profile' 
              element={<Profile/>}
            />
          </Routes> {/* End of the <Routes/> component */}
        </CartProvider>
      </UserMetadataContext.Provider>
      </div>
    </>
  ) 
  /* End of the App.jsx component */
}

// END of return statement:

export default App
