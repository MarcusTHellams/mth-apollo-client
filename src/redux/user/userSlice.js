import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, { payload }) => {
       return  payload?.data || [];
    },
  },
});

export const { setUsers } = userSlice.actions;
export const { reducer: usersReducer } = userSlice;

export const selectAllUsers = state => state.users;