import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className='log-in-button-container'>
      <button 
        className="login-button"
        onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div> // End of log-in-button-container
  )
};

export default LoginButton;