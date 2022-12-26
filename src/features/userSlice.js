import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem('token')
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  }
})

export const { logout, login, setToken } = userSlice.actions

export const selectUser = (state) => state.user.user
export const selectToken = (state) => state.user.token

export default userSlice.reducer;
