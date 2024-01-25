import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = (props) => {
  const { onSubmit } = props;
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordAgain: "",
  });
  const handleRegister = (event) => {
    event.preventDefault();
    const dataRegister = validate(values);
    console.log(dataRegister);
    if(dataRegister.name !== "" && 
    dataRegister.email !== "" && 
    dataRegister.password !== "" && 
    dataRegister.passwordAgain !== "" &&
    dataRegister.password === dataRegister.passwordAgain){
      onSubmit(dataRegister);

    }

  };
  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      toast.error('Name is required!', {
        position: toast.POSITION.TOP_RIGHT
    });
      
    }
    if (!values.email) {
      toast.error('Email is required!', {
        position: toast.POSITION.TOP_RIGHT
    });
      
    } else if (!regex.test(values.email)) {
      toast.error('This is not a valid email format!', {
        position: toast.POSITION.TOP_RIGHT
    });
      
    }
    if (!values.password) {
      toast.error('Password is required!', {
        position: toast.POSITION.TOP_RIGHT
    });
      
    }
    if (!values.passwordAgain) {
      toast.error('PasswordAgain is required!', {
        position: toast.POSITION.TOP_RIGHT
    });
      
    }
    if (values.password !== values.passwordAgain) {
      toast.error('Re-entered password is incorrect!', {
        position: toast.POSITION.TOP_RIGHT
    });
      
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
    <div className="mt-[2%]">
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleRegister}>
        <div className="text-xl  flex items-center justify-center font-bold text-zinc-400 mb-4 mt-[-20px]">REGISTER</div>
          <input
            type="name"
            className="p-3 rounded border-1 focus:focus:border-teal-500 border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your name"
            name="name"
            onChange={handleInputChange}
          ></input>
          <input
            type="email"
            className="p-3 rounded border-1 focus:focus:border-teal-500 border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
          ></input>
          <input
            type="password"
            className="p-3 rounded border-1 focus:focus:border-teal-500 border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your password"
            name="password"
            onChange={handleInputChange}
          ></input>
          <input
            type="password"
            className="p-3 rounded border-1 focus:focus:border-teal-500 border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter the password again"
            name="passwordAgain"
            onChange={handleInputChange}
          ></input>
          <button
            type="submit"
            className="p-3 bg-neutral-400 hover:bg-neutral-600 text-white text-sm w-full font-medium rounded-lg"
          >
            Register
          </button>
          <div className="mt-3 mb-[-20px] ml-4">
            Do you already have an account?
            <span className="pl-3 text-cyan-400 hover:text-emerald-400 cursor-pointer underline" onClick={handleClick}>Go to login</span>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1200}></ToastContainer>
    </div>
  );
};

export default RegisterForm;
