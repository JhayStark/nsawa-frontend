import { decryptData, encryptData } from '@/lib/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:
    typeof window !== 'undefined'
      ? decryptData(localStorage.getItem('user'))
      : null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem('user', encryptData(action.payload.user));
    },

    logout: state => {
      state.user = null;
      localStorage.removeItem('user');
    },
    login: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      localStorage.setItem('user', encryptData(action.payload.user));
    },
  },
  selectors: {
    selectUser: auth => auth.user,
  },
});

export const { setUser, logout, login } = authSlice.actions;
export const { selectUser } = authSlice.selectors;
export default authSlice.reducer;
