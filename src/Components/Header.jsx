import React from 'react';
import "./Header.css";
import {MdLogin} from "react-icons/md";
import {BsFillPersonFill} from "react-icons/bs";
import { useDispatch,useSelector } from 'react-redux';
import {showLogin, showRegister} from "../features/switchSlice.js";
function Header(props) {
  const state=useSelector((state)=>{
    return state.switch.showTab;
  })
  const dispatch=useDispatch();
  return (
    <div className='header'>
    <div className='left-heading'>
     <p>Task App</p>
    </div>
    <div className='right-heading'>
        <p onClick={()=>{dispatch(showLogin(state))}}><span className=''><MdLogin size={20}></MdLogin></span>Login</p>
        <p onClick={()=>{dispatch(showRegister(state))}}> <span><BsFillPersonFill size={20}/></span>Register</p>
    </div>
    </div>
  )
}

export default Header