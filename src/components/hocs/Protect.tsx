import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import {  useAppSelector } from "../../redux/hooks";
import { selectUserDetails } from "../../redux/userSlice";

const Protect: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useAppSelector(selectUserDetails);
  console.log(user)
  const { loggedIn } = useAppSelector(selectUserDetails);
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (loggedIn) {
    return <Navigate to={'/login'} replace />;
  }
  console.log("this checks everywhere");

  return children;
};

export default Protect;