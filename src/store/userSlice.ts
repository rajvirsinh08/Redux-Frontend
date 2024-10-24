import { createSlice } from '@reduxjs/toolkit';

interface User{
  email:string;
}
interface UserState{
  user:User|null;
  accessToken:string|null;
}
const initialState: UserState = {
  user: null,
  accessToken: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
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
export type RootState = {
  user: UserState;
};

export const { login, logout } = userSlice.actions;

export const selectUser = (state:RootState) => state.user;
export const selectUserEmail = (state:RootState) => state.user.user?.email;
export default userSlice.reducer;
