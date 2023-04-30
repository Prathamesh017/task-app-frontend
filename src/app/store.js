import { configureStore } from '@reduxjs/toolkit'
import switchReducer from '../features/switchSlice'
import registerReducer from '../features/authSlice';
import TaskReducer from "../features/taskSlices"

const store=configureStore({
  reducer: {
    switch: switchReducer,
    register:registerReducer,
    task:TaskReducer,
  }
})
export default store;