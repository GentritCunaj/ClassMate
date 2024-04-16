// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { decodeToken } from '../AuthUtils';

const PrivateRoute = ({ children,roles}) => {
   
  
    const isAuthenticated = localStorage.getItem('token');
    const decodedToken = decodeToken(isAuthenticated);
  
    if (!isAuthenticated){
      return <Navigate to="/" />;
    }
  

    if (roles && roles.length > 0 && !roles.includes(decodedToken.role)) {
      // Redirect to unauthorized if roles don't match
      return <Navigate to="/unauthorized" />;
    }
  
    // Render the protected component using the Route component
    return children;
  };
  

export default PrivateRoute;
