import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Log in and log out buttons/LoginButton";
import LogoutButton from "./Log in and log out buttons/LogoutButton";

const AuthButton = () => {
  const { isAuthenticated, user } = useAuth0();
  // console.log("AuthButton user:", user, "isAuthenticated:", isAuthenticated);
  
  return (
    <>
      {!isAuthenticated ? (
        <LoginButton/>
      ) : (
        <div className='authenticated-user-container'>
          <div className='authenticated-user-name'>
            Welcome, {user.name}
          </div>
          <LogoutButton/>
        </div>
      )}
    </>
  );
}

export default AuthButton;