import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authContext from "../../contexts/AuthContext/authContext";
import AuthServices from "../../services/authServices";
import axiosInstance from "../../services/axiosInstance";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
import ContactService from "../../services/contactServices";
import { LOGOUT } from "../../contexts/types";
import { initialLogout } from "../LogoutForm/LogoutForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initialValues } from "../../pages/HomePage/HomePage";

const ProfileForm = () => {
  // const { onSubmit } = props;
  const { tokenize, state, dispatch } = useContext(authContext);
  // console.log(state);
  const navigate = useNavigate();
  const initialValuesUpdate = {
    name: "",
    email: "",
    passworNow:"",
      passwordAgain:"",
      passwordNew:"",
  }
  const [values, setValues] = useState(initialValuesUpdate);
  const [hide, setHide] = useState(false);

  const handleRegister = async (event) => {
    // event.preventDefault();
    // console.log("a");
    const dataUpdateUser = validate(values);
    if((values.passworNow && 
      values.passwordAgain && 
      values.passwordNew &&
      values.passwordNew === values.passwordAgain &&
      values.name &&
      values.email) || 
      (!values.passworNow && 
      !values.passwordAgain && 
      !values.passwordNew  &&
      values.name &&
      values.email)){
        try {     
          console.log( state.user.name);
          await AuthServices.updateUserProfile(dataUpdateUser);
          await ContactService.updateManyContact(dataUpdateUser, state.user.name);
          console.log("abc");
          toast.success('Update successful!', {
            position: toast.POSITION.TOP_RIGHT
        });
          
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
        });
        }
        tokenize();
    }
    setValues(initialValuesUpdate);
    
    // alert("Cap nhat thanh cong!");
    // onSubmit(dataRegister);
  };
  const handleDeleteAcc = async () => {
    const conf = window.confirm("Ban co chan chan muon xoa");
    if(conf){
      try {
        await ContactService.deleteManyContact();
        await AuthServices.deleteUser();
      } catch (error) {
        toast.error('Account deletion failed!', {
          position: toast.POSITION.TOP_CENTER
      });
      }
      const action = {
        type: LOGOUT,
        payload: initialLogout,
      };
      dispatch(action);
      toast.success('Account deleted successfully!', {
        position: toast.POSITION.TOP_CENTER
    });
    setTimeout(()=>{
      navigate("/login");
    },5500)
    }
  };

  useEffect(() => {
    // fetchUserProfile();
    if (!state.user) {
      // console.log("a");
      tokenize();
      // console.log("c");
    }
    setValues({
      ...values,
      ...state.user,
    });
    // console.log("d");
  }, [state]);

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      toast.error("Name is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (!values.email) {
      toast.error("Email is required!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (!regex.test(values.email)) {
      toast.error("This is not a valid email format!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (values.passworNow || values.passwordAgain || values.passwordNew) {
      if (!values.passworNow) {
        toast.error("Password is required!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (!values.passwordNew) {
        toast.error("Password new is required!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (!values.passwordAgain) {
        toast.error("Password again is required!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (values.passwordNew !== values.passwordAgain) {
        toast.error("Re-entered password is incorrect!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    return values;
  };
  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="h-[100vh]">
      <Header></Header>
      <div className="w-full h-[75vh] max-w-[500px] mx-auto bg-white  p-5 ">
        <div>
          {!hide && (
            <div className="text-xl  flex items-center justify-center font-bold text-zinc-400 mb-4 mt-[-20px]">
              Your Profile
            </div>
          )}
          {hide && (
            <div className="text-xl  flex items-center justify-center font-bold text-zinc-400 mb-4 mt-[-20px]">
              Edit Your Profile
            </div>
          )}
          <div>Name:</div>
          <input
            type="name"
            className="pl-3 mt-1 rounded border-1 border-gray-200 w-full outline-none focus:border-lime-400 p-1.5 mb-2"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            disabled={!hide}
            onChange={handleInputChange}
          ></input>
          <div>Email:</div>
          <input
            type="email"
            className="pl-3 mt-1 rounded border-1 border-gray-200 w-full mb-2 outline-none focus:border-lime-400 p-1.5"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            disabled={!hide}
            onChange={handleInputChange}
          ></input>
          {!hide && (
            <div>
              <div>Password:</div>
              <input
                type="password"
                className="pl-3 mt-1 rounded border-1 border-gray-200 w-full mb-2 outline-none focus:border-lime-400 p-1.5"
                name="password"
                value="123456"
                disabled={!hide}
                onChange={handleInputChange}
              ></input>
            </div>
          )}

          {hide && (
            <div>
              <div>Password now:</div>
              <input
                type="password"
                className="pl-3 mt-1 rounded border-1 border-gray-200 w-full mb-2 outline-none focus:border-lime-400 p-1.5"
                placeholder="Enter the password now"
                name="passworNow"
                onChange={handleInputChange}
              ></input>
            </div>
          )}
          {hide && (
            <div>
              <div>Password new:</div>
              <input
                type="password"
                className="pl-3 mt-1 rounded border-1 border-gray-200 w-full mb-2 outline-none focus:border-lime-400 p-1.5"
                placeholder="Enter the password new"
                name="passwordNew"
                onChange={handleInputChange}
              ></input>
            </div>
          )}
          {hide && (
            <div>
              <div>Password new again:</div>
              <input
                type="password"
                className=" pl-3 mt-1 rounded border-1 border-gray-200 w-full mb-2 outline-none focus:border-lime-400 p-1.5"
                placeholder="Enter the password again"
                name="passwordAgain"
                onChange={handleInputChange}
              ></input>
            </div>
          )}
          <div className="flex justify-end">
            {hide && (
              <span
                className="ml- p-2 bg-slate-300 hover:bg-gray-400 border-solid border-2 rounded-lg "
                disabled={hide}
                onClick={() => {
                  handleRegister();
                  setHide((pre) => !pre);
                }}
              >
                Save
              </span>
            )}

            {hide && (
              <span
                className="ml-2 p-2  bg-red-700 text-slate-50 hover:bg-red-900 border-solid border-2 rounded-lg "
                onClick={() => setHide((pre) => !pre)}
              >
                Exit
              </span>
            )}

            {!hide && (
              <span
                className="ml- p-2 bg-slate-300 hover:bg-gray-400 border-solid border-2 rounded-lg "
                onClick={() => setHide((pre) => !pre)}
              >
                Edit
              </span>
            )}

            {!hide && (
              <span
                className="ml-2 p-2  bg-red-700 hover:bg-red-900 text-slate-50 border-solid border-2 rounded-lg "
                disabled={hide}
                onClick={handleDeleteAcc}
              >
                Delete Acc
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="h-[15vh]">
        <Footer></Footer>
      </div>
      <ToastContainer autoClose={1200}></ToastContainer>
    </div>
  );
};

export default ProfileForm;
