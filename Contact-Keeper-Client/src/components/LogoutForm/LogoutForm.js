import React, { useContext } from 'react';
import authContext from '../../contexts/AuthContext/authContext';
import { useNavigate } from 'react-router-dom';


export const initialLogout = {
  isAuthenticated: false,
  token: null,
  user: null
}
const LogoutForm = (props) => {
    const {onSubmit } = props;
    // const navigate = useNavigate();

    const {state} = useContext(authContext);
    const handleLogout = (event) => {
      event.preventDefault();
      onSubmit(initialLogout)
    }

    // const handleShowProfile = () => {
    //   navigate("/profileForm")
    // }
    return (    
        <form onSubmit={handleLogout} >
          
            <div className="flex border-red-50 border-2 p-1 rounded-lg bg-gray-200">
               <span className="flex items-center justify-center pl-3"
               >{state.user.name}</span>
                <button type="submit"
                 className="ml-5 text-slate-50 bg-black hover:bg-teal-600  border-solid border-2 rounded-lg border-blue-400 p-1.5" 
                // onClick={handleLogout}
                >
                  Log Out
                </button>
                </div>      
            
        </form>
    );
};

export default LogoutForm;