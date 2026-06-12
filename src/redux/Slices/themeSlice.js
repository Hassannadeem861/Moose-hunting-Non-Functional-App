import { createSlice } from '@reduxjs/toolkit';

// ─── Initial State ────────────────────────────────────────────────────────────
// Theme ke do modes hain: 'dark' aur 'light'
// Default 'dark' mode hai
const initialState = {
  mode: 'dark', // 'dark' ya 'light'
};

// ─── Slice ────────────────────────────────────────────────────────────────────
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // ── Theme toggle karo (dark ↔ light) ──
    // Agar dark hai to light ho jaye, agar light hai to dark ho jaye
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
    },

    // ── Theme ko specific mode par set karo ──
    // 'dark' ya 'light' mode directly set kar do
    setTheme: (state, action) => {
      // action.payload = 'dark' ya 'light'
      if (action.payload === 'dark' || action.payload === 'light') {
        state.mode = action.payload;
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
