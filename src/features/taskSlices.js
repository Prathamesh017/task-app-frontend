import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const backendUrl=`https://task-app-backend-z8r0.onrender.com/api/v1/task`
const initialState = {
  data: {
    Alltasks:[],
  },
  status: 'idle',
  error: null,
  isAdded:false,
  
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    logoutTaskReducer: (state) => ({
      ...state,
      status: 'idle',
      data: {
        Alltasks:[],
      },
    }),
    
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTasks.pending, (state, action) => ({
        ...state,
        status :'loading'
      }))
      .addCase(getAllTasks.fulfilled, (state, action) => ({
        ...state,
        status: 'Successfully GET',
        data: {
          Alltasks:action.payload.data.Alltasks
        }
      }))
      .addCase(getAllTasks.rejected, (state, action) => ({
        ...state,
        status : 'failed',
        error : action.error.message
      }))
     .addCase(createATask.pending, (state, action) => ({
        ...state,
        status :'loading'
      }))
      .addCase(createATask.fulfilled, (state, action) => ({
        ...state,
        status: 'Successfully Added',
       
      }))
      .addCase(createATask.rejected, (state, action) => ({
        ...state,
        status : 'failed',
        error : action.error.message
      }))
      .addCase(deleteATask.pending, (state, action) => ({
        ...state,
        status :'loading'
      }))
      .addCase(deleteATask.fulfilled, (state, action) => ({
        ...state,
        status: 'Successfully Deleted',
       
      }))
      .addCase(deleteATask.rejected, (state, action) => ({
        ...state,
        status : 'failed',
        error : action.error.message
      }))


  },
})

export const getAllTasks = createAsyncThunk('task/get', async (data,thunkApi) => {
  const user=JSON.parse(localStorage.getItem("user"));
  const { _id:id,token} = user.data;

  try {
    
  const response = await axios.get(`${backendUrl}/${id}`,{
    headers:{
      "Authorization" : `Bearer ${token}`
    }
   
  })
  
  return response.data
}catch (error) {
  return thunkApi.rejectWithValue(error.response.data.message);
  
}
})

export const createATask= createAsyncThunk('task/post', async (data,thunkApi) => {
  const {taskName,taskNumber}=data;
  const user=JSON.parse(localStorage.getItem("user"));
  const { _id:userId,token} = user.data;
  console.log(taskName,taskNumber,token)
  try{

  const response = await axios.post(`${backendUrl}`,{userId,taskName,taskNumber},{
     headers:{
       "Authorization" : `Bearer ${token}`
     }
  
  })

  getAllTasks();
  return response.data
}catch (error) {
 
  return thunkApi.rejectWithValue(error.response.data.message);
  
}
})

export const deleteATask=createAsyncThunk('task/delete', async (data,thunkApi) => {
  const id = data
  const user=JSON.parse(localStorage.getItem("user"));
  const {token} = user.data;
  
  try{
  const response = await axios.delete(`${backendUrl}/${id}`,{
    headers:{
      "Authorization" : `Bearer ${token}`
    }
    
  })
  getAllTasks();
  return response.data
}
catch (error) {
 
  
  return thunkApi.rejectWithValue(error.response.data.message);
  
}
})

export const {logoutTaskReducer} = taskSlice.actions

export default taskSlice.reducer
