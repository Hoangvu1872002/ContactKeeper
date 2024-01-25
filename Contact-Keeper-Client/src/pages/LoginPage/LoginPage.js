import React, { useContext } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
// import axios from 'axios';
import authContext from '../../contexts/AuthContext/authContext';
import { LOGIN } from '../../contexts/types';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import AuthServices from '../../services/authServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext);
    const onLoginSubmit = async(values) =>{
        if(values){
            try {
                console.log("abc");
                // const onLoginRespone = await axiosInstance.post("/users/login", values)
                const  onLoginRespone = await AuthServices.login(values)
                const action = {
                    type: LOGIN,
                    payload: onLoginRespone.data,
                }
                dispatch(action);
                toast.success('Logged in successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });
                setTimeout(()=>{
                    navigate("/")
                },1500)
                
            } catch (error) {
               
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
    return (
        <div>
            <LoginForm onSubmit = {onLoginSubmit} ></LoginForm>
            <ToastContainer autoClose={1200} />
        </div>
    );
};

export default LoginPage;