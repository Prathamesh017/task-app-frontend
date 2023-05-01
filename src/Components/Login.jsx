import React ,{useState,useEffect} from 'react'
import "./login.css";
import {MdLogin} from "react-icons/md";
import { checkisEmpty,validateEmail ,removeErrors} from '../helpers/helper';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { loginUser,removeError } from '../features/authSlice';
import Loader from './Loader';

function Login() {
  const [intialData,setIntialData]=useState({
    email:"",
    password:"",
  })
  const [errorMessage,showErrorMessage]=useState({
    email:"",
    password:"",
  });
  const [clearError,setClearError]=useState(false);
 const navigate=useNavigate();
 const dispatch=useDispatch();
 const loginData=useSelector((state)=>{
  return state.register;
})
  useEffect(()=>{
    if(loginData.status==="Success"){
     navigate("/task");
    }
   },[loginData,navigate])
   useEffect(()=>{
     if((clearError &&errorMessage.email===null&&errorMessage.password===null)){
  
       dispatch(loginUser(intialData));
     }
   },[errorMessage,dispatch,intialData,clearError])
const submitData=()=>{
   for (const key in intialData) {
     checkisEmpty(key,intialData[key],showErrorMessage);
  }
  if(intialData.email.length>=3){
    
    validateEmail(intialData.email,showErrorMessage);
  }
  setClearError(true);
}

  return (
    <div className='login-form'>
        <div className='login'>

        <h1><MdLogin></MdLogin>Login</h1>
        <h3>Please Enter Details</h3>
        <div className='form'>
          <div className='input-div'>
            <input type='text' placeholder='enter email'  onChange={(event)=>{
              removeErrors("email",showErrorMessage);
               setClearError(false);
              dispatch(removeError(loginData));
              setIntialData((intialData=>({...intialData,email:event.target.value})))
            }}></input>
            
            <p>{errorMessage.email}</p>
              </div>
            <div className='input-div'>
            <input type='text' placeholder='enter password'  onChange={(event)=>{
              dispatch(removeError(loginData));
              removeErrors("password",showErrorMessage,loginData);
              setClearError(false);
              setIntialData((intialData=>({...intialData,password:event.target.value})))
            }}></input>
            <p>{errorMessage.password}</p>
            </div>
        </div>
        <button onClick={submitData}>Login</button>
        {
          loginData.status==="loading"&& <Loader></Loader>
        }
        <p className='final-error'>{loginData.error}</p>
        </div>
    </div>
  )
}

export default Login;
