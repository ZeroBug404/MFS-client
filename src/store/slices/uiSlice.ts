
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: number;
}

const initialState: UiState = {
  isSidebarOpen: true,
  theme: 'light',
  notifications: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setNotifications: (state, action: PayloadAction<number>) => {
      state.notifications = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme, setNotifications } = uiSlice.actions;
export default uiSlice.reducer;
