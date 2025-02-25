
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    role: 'user' | 'admin' | 'agent' | null;
    name: string | null;
    email: string | null;
  };
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {
    role: null,
    name: null,
    email: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    updateUserRole: (state, action: PayloadAction<'user' | 'admin' | 'agent'>) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
  },
});

export const { setUser, logout, updateUserRole } = authSlice.actions;
export default authSlice.reducer;
