import React, { useContext } from "react";
import authContext from "../../contexts/AuthContext/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { Component } = props;
  const { state } = useContext(authContext);
  const { isAuthenticated } = state;
  if (isAuthenticated){
    return <Component />
  }else{
    return <Navigate to = "/login"></Navigate>
  }
};

export default PrivateRoute;
