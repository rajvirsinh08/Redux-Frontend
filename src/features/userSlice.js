<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },         
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserEmail = (state) => state.user.user?.email;
export default userSlice.reducer;

=======
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },         
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserEmail = (state) => state.user.user?.email;
export default userSlice.reducer;

>>>>>>> origin/main
