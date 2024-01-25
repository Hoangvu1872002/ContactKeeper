import React, { useContext, useState } from 'react';
import LogoutForm from '../../components/LogoutForm/LogoutForm';
import { initialState } from '../../contexts/AuthContext/AuthState';
import { LOGOUT } from '../../contexts/types';
import { useNavigate } from 'react-router-dom';
import authContext from '../../contexts/AuthContext/authContext';

const LogoutPage = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext);
    // const logoutKey = true;
    // const [signal, setSignal] = useState(logoutKey);
    // console.log(setSignal);

    const onLogoutSubmit = (values) =>{
        console.log("aaa");
                    const action = {
                        type: LOGOUT,
                        payload: values,
                    }
                    dispatch(action);
                     navigate("/login")
          
    }
    // if(signal !== logoutKey)onLogoutSubmit(initialState);
    return (
        <div>
            <LogoutForm  onSubmit = {onLogoutSubmit} ></LogoutForm>
        </div>
    );
};

export default LogoutPage;