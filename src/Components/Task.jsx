import React, { useEffect, useState } from 'react'
import "./Task.css";
import {useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutReducer} from '../features/authSlice';
import { getAllTasks ,createATask ,deleteATask,  logoutTaskReducer} from '../features/taskSlices';
import Loader from './Loader';
function Task() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
  const registerState=useSelector((state)=>{
        return state.register;
      })
    const taskState =useSelector((state)=>{
        return state.task;
    })
    const [task,setTask]=useState("");
    
  
  useEffect(()=>{
    dispatch(getAllTasks(taskState));
  },[])

  

 const logout=()=>{
  localStorage.clear();
    dispatch(logoutReducer(registerState));
    dispatch(logoutTaskReducer(taskState))
    navigate("/");
 }

 const submitTask=async ()=>{
  let taskObj={
    taskNumber:taskState.data.Alltasks.length+1,
    taskName:task,
  }
  
  await dispatch(createATask(taskObj)).unwrap().then((pt)=>{
   console.log("pt",pt);
    dispatch(getAllTasks(taskState));
  }).catch((e)=>{
    console.log(e);
  })
 }

 const deleteTask=(id)=>{

  dispatch(deleteATask(id)).unwrap().then((pt)=>{
   
    dispatch(getAllTasks(taskState));
  }).catch((e)=>{
    console.log(e);
  })
 }
  return (
    <div className='tasks-component'>
        <div className='tasks-header'>
            <p className='task-title'>Task List</p>
            <button className='logout-button' onClick={()=>{logout()}}>
                Logout
                </button>
        </div>
        <div className='task-body'>
  
         <div className='task-main'>


        <h1>Welcome {registerState.data.name}</h1>
        <h3 className='second-header'>Goals Dashboard</h3>
            <input type='text' placeholder='enter task' onChange={(event)=>{setTask(event.target.value)}}></input>  
            <button className='submit-button' onClick={()=>{submitTask()}}>Submit</button>
            {
          taskState.status==="loading"&& <Loader></Loader>
        }
         </div>
     
     

        <div className='task-list'>

          {
            taskState.data.Alltasks.length>0 && taskState.data.Alltasks.map((task)=>{
              return(
              <div className="grid-container">
                <div className="grid-item item1">{task.taskName}</div>
       <button className='btn item2' onClick={()=>{deleteTask(task._id)}}>X</button>
        </div>

            )})
          }
       
        
       
   
        </div>


        </div>
      
    </div>
  )
}

export default Task
