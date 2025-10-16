import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'
const Protect: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = Cookies.get('access_token') ?? null
  console.log(token)
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protect;
