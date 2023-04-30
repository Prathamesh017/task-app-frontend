import React from 'react'
import Header from './Header'
import Register from './Register'
import Login from './Login';
import { useSelector } from 'react-redux';
function Dashboard() {
 const showTab=useSelector((state)=>{
  return state.switch.showTab;
})

  return (
    <div className='App'>
        <div>
        <Header></Header>
        </div>
        <div>
        {showTab===true?<Register></Register>:<Login></Login>}
        </div>
       
    </div>
    
  )
}

export default Dashboard