// src/features/menu/menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    abierto: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.abierto = !state.abierto;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;