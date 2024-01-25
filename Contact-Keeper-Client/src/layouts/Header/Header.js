import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import authContext from "../../contexts/AuthContext/authContext";
import { LOGOUT } from "../../contexts/types";
import { initialState } from "../../contexts/AuthContext/AuthState";
import LogoutForm from "../../components/LogoutForm/LogoutForm";
import LogoutPage from "../../pages/LogoutPage/LogoutPage";

const Header = (props) => {
  const {state, dispatch} = useContext(authContext);
  // const {isAuthenticated} = state;
  
  // console.log(state);
  
  return (
    <header className="h-[10vh] " >
      <nav className="navbar navbar-expand-lg navbar-light bg-neutral-300  ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          Contact Keeper
          </Link>
          
          <div className="navbar-nav me-auto mb-2 mb-lg-0   ">
              <span className=" ">
                <Link className="nav-link " to="/">
                  Home
                </Link>
              </span>
              <span className="nav-item">
                <Link className="nav-link" to="/profileForm">
                  Profile
                </Link>
              </span>
              <span className="nav-item">
                <Link className="nav-link" to="/home">
                  About
                </Link>
              </span>
            </div>
            { 
              state.user && state.user.name ? (
                <LogoutPage></LogoutPage>
              ):(<div></div>)
            }
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
