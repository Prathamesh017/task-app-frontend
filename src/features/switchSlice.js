import { createSlice } from '@reduxjs/toolkit'

export const tabSlice = createSlice({
  name: 'showTab',
  initialState: {
    showTab: true,
  },
  reducers: {
    showLogin: (state) => ({
      ...state,
      showTab: false,
    }),
    showRegister: (state) => ({
      ...state,
      showTab: true,
    }),
  },
})
export const { showLogin, showRegister } = tabSlice.actions

export default tabSlice.reducer
