<<<<<<< HEAD
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import statement
import { selectUser } from '../features/userSlice';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const accessToken = user ? user.accessToken : null;

  if (!accessToken) {
    return <Navigate to="/signin" />;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const { exp } = decodedToken;

    // Calculate the current time in seconds since Epoch
    const currentTimeInSeconds = Date.now() / 1000;

    // Check if token is expired (considering a 1-minute expiry)
    if (currentTimeInSeconds >= exp) {
      return <Navigate to="/signin" />;
    }
  } catch (e) {
    console.error("Token parsing error:", e);
    return <Navigate to="/signin" />;
  }

  return children;
};

=======
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import statement
import { selectUser } from '../features/userSlice';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const accessToken = user ? user.accessToken : null;

  if (!accessToken) {
    return <Navigate to="/signin" />;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const { exp } = decodedToken;

    // Calculate the current time in seconds since Epoch
    const currentTimeInSeconds = Date.now() / 1000;

    // Check if token is expired (considering a 1-minute expiry)
    if (currentTimeInSeconds >= exp) {
      return <Navigate to="/signin" />;
    }
  } catch (e) {
    console.error("Token parsing error:", e);
    return <Navigate to="/signin" />;
  }

  return children;
};

>>>>>>> origin/main
export default PrivateRoute;