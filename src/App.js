import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Task from './Components/Task';


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Dashboard></Dashboard>} ></Route>
        <Route path="task" element={<Task/>}></Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
