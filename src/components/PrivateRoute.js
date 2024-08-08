import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import { selectUser } from '../features/userSlice';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  // return user ? children : <Navigate to="/login" />;
  const accessToken = user ? user.accessToken : null;

  if (!accessToken) {
    return <Navigate to="/signin"  replace="true"/>;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const { exp } = decodedToken;

    // Calculate the current time in seconds since Epoch
    const currentTimeInSeconds = Date.now() / 1000;

    // Check if token is expired (considering a 1-minute expiry)
    if (currentTimeInSeconds >= exp) {
      return <Navigate to="/signin" replace="true" />;
    }
  } catch (e) {
    console.error("Token parsing error:", e);
    return <Navigate to="/signin"  replace="true" />;
  }

  return children;
};

export default PrivateRoute;