import { useEffect, useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axiosInstance from "../../services/axiosInstance";
import { USER_UPDATED } from "../types";
import AuthServices from "../../services/authServices";

export const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  isAuthenticated: !!localStorage.getItem("token") && true,
};
const AuthSate = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // console.log(state);
  const tokenize = async () => {
    const tokenLocalStorage = localStorage.getItem("token");
    // console.log(tokenLocalStorage);
    if (tokenLocalStorage){
        try {
          axiosInstance.defaults.headers.common["x-auth-token"] = tokenLocalStorage;
          // const res = await axiosInstance.get("/users/userpull");
          const res = await AuthServices.fetchUserInfor();
          // console.log({res});
        //  console.log(res);
        // console.log("b");
          dispatch({
            type: USER_UPDATED,
            payload: res.data,
          })
        
        } catch (error) {
          console.log(error);
          delete axiosInstance.defaults.headers.common["x-auth-token"];
        }
    }else{
        delete axiosInstance.defaults.headers.common["x-auth-token"];
    }
  };

  // useEffect(() => {
  //   if (!state.user) {
  //   tokenize();
  //   }
  //   // console.log("A");
  // }, [state]);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        tokenize
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthSate;
