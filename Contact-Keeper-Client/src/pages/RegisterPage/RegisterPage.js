import React, { useContext } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import AuthServices from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import authContext from '../../contexts/AuthContext/authContext';
import { REGISTER } from '../../contexts/types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const onRegisterSubmit = async(values) => {
        if(values){
            // console.log("bc");
            try {
                // console.log(values);
                // const onLoginRespone = await axiosInstance.post("/users/login", values)
             await AuthServices.register(values)
                navigate("/login")
    
            } catch (error) {
                // console.log("bc");
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
    return (
        <div>
            <RegisterForm onSubmit = {onRegisterSubmit}></RegisterForm>
            <ToastContainer autoClose={1200}></ToastContainer>
        </div>
    );
};

export default RegisterPage;