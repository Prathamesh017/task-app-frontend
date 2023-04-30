import React, { useEffect, useState} from 'react'
import "./Register.css";
import {BsFillPersonFill} from "react-icons/bs";
import { checkisEmpty,validateEmail ,removeErrors} from '../helpers/helper';
import { registerUser, } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from "react-router-dom"
import Loader from './Loader';



function Register() {
const [intialData,setIntialData]=useState({
  name:"",
  email:"",
  password:"",
  cpassword:"",
})
const [errorMessage,showErrorMessage]=useState({
  name:"",
  email:"",
  password:"",
  cpassword:""
});
const dispatch=useDispatch();
const registerData=useSelector((state)=>{
  return state.register;
})
const navigate = useNavigate();




useEffect(()=>{
 if(registerData.status==="Success"){
  navigate("/task");
 }
},[registerData,navigate])
useEffect(()=>{
  if((errorMessage.name===null&& errorMessage.email===null&&errorMessage.password===null&&errorMessage.cpassword===null)){
    // const {name,email,password}=intialData;
    dispatch(registerUser(intialData));
  }
},[errorMessage,dispatch,intialData])
const submitData=()=>{
 for (const key in intialData) {
   checkisEmpty(key,intialData[key],showErrorMessage);
}
if(intialData.email.length>=3){
  // validateEmail(intialData.email,showErrorMessage);
}
if(intialData.cpassword.length>0 && intialData.password.length>0){
  showErrorMessage((errorMessage)=>({...errorMessage,cpassword:intialData.cpassword!==intialData.password?"passwords don't match":null}));
}

}
  return (
    <div className='register-form'>
        <div className='register'>

        <h1><BsFillPersonFill></BsFillPersonFill> Register</h1>
        <h3>Create An Account</h3>
        <div className='form'>
          <div className='input-div'>
            <input type='text' placeholder='enter name' onChange={(event)=>{
                removeErrors("name",showErrorMessage);
              setIntialData((intialData=>({...intialData,name:event.target.value})))
            }}></input>
            <p>{errorMessage.name}</p>
             </div>
            <div className='input-div'>
            <input type='email' placeholder='enter email' onChange={(event)=>{
                removeErrors("email",showErrorMessage);
              setIntialData((intialData=>({...intialData,email:event.target.value})))
            }}></input>
              <p>{errorMessage.email}</p>
             </div>
            <div className='input-div'>
            <input type='password' placeholder='enter password' onChange={(event)=>{
                removeErrors("password",showErrorMessage);
              setIntialData((intialData=>({...intialData,password:event.target.value})))
            }}></input>
              <p>{errorMessage.password}</p>
             </div>
             <div className='input-div'>
            <input type='password' placeholder='confirm password' onChange={(event)=>{
                removeErrors("cpassword",showErrorMessage);
              setIntialData((intialData=>({...intialData,cpassword:event.target.value})))
            }}></input>
              <p>{errorMessage.cpassword}</p>
             </div>
             
        </div>
        <button onClick={submitData}>Regiser</button>
        {
          registerData.status==="loading"&& <Loader></Loader>
        }
         <p className='final-error'>{registerData.error}</p>
        </div>
    </div>
  )
}

export default Register