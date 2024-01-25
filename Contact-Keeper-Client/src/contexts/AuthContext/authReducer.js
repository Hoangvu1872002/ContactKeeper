import React from 'react';
import { LOGIN, LOGOUT, REGISTER, USER_UPDATED } from '../types';
import { initialState } from './AuthState';
import axiosInstance from '../../services/axiosInstance';

const authReducer = (state, action) => {
    const {type, payload} = action;

    switch (type){
        case LOGIN: {
            localStorage.setItem("token",payload.token)
            return {
                ...state,
                ...payload
            }
        }
        case USER_UPDATED:
            return {
              ...state,
              isAuthenticated: true,
              token: localStorage.getItem("token"),
              user: payload,
            };
        case LOGOUT:{
            console.log("abc");
            delete axiosInstance.defaults.headers.common["x-auth-token"];
            localStorage.removeItem("token");
            // console.log("abc");
            console.log(payload);
            return{
                ...state,
                ...payload
            }
        }
        default: 
        return state
    }
    
};

export default authReducer;