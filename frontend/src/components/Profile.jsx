import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [backendUser, setBackendUser] = useState(null);

  useEffect(() => {
    const sendJWTToBackend = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://dev-ngpva7twomewnfum.us.auth0.com/api/v2/",
            scope: "openid profile email",
          },
        });
        console.log("Auth0 access token:", accessToken);

        // Send JWT to Django backend
        const response = await fetch("http://localhost:8000/api/profile/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBackendUser(data);
        } else {
          setBackendUser(null);
        }
      } catch (e) {
        console.log(e.message);
        console.log("Error getting access token:", e);

      }
    };
    sendJWTToBackend();
  }, [getAccessTokenSilently]);


  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>Backend User Data</h3>
      {backendUser ? (
        <pre>{JSON.stringify(backendUser, null, 2)}</pre>
      ) : (
        "No backend user data returned"
      )}
    </div>
  );
};

export default Profile;