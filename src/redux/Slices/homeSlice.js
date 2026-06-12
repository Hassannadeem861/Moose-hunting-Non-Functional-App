import { createSlice } from '@reduxjs/toolkit';

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  // ── Audio Player ────────────────────────────────────────────────────────
  isPlaying: false,
  selectedMoose: '1',       // currently selected moose id
  volume: 0.7,              // 0.0 – 1.0

  // ── Recent Sightings ─────────────────────────────────────────────────────
  // TODO: [FUNCTIONAL] Replace with async thunk data when API is ready
  sightings: [],
  sightings_status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'error'
  sightings_error: null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // ── Player controls ──────────────────────────────────────────────────
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setSelectedMoose: (state, action) => {
      state.selectedMoose = action.payload;
      state.isPlaying = false; // reset play when moose changes
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },

    // ── Sightings (local CRUD — replace with async thunks later) ─────────
    setSightings: (state, action) => {
      state.sightings = action.payload;
    },
    addSighting: (state, action) => {
      state.sightings.unshift(action.payload);
    },
    updateSighting: (state, action) => {
      const idx = state.sightings.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) state.sightings[idx] = action.payload;
    },
    deleteSighting: (state, action) => {
      state.sightings = state.sightings.filter(s => s.id !== action.payload);
    },

    // ── Reset ────────────────────────────────────────────────────────────
    resetHomeState: () => initialState,
  },

  // TODO: [FUNCTIONAL] Uncomment extraReducers when API services are ready
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchSightingsAsync.pending, (state) => {
  //       state.sightings_status = 'loading';
  //     })
  //     .addCase(fetchSightingsAsync.fulfilled, (state, action) => {
  //       state.sightings_status = 'succeeded';
  //       state.sightings = action.payload;
  //     })
  //     .addCase(fetchSightingsAsync.rejected, (state, action) => {
  //       state.sightings_status = 'error';
  //       state.sightings_error = action.payload;
  //     });
  // },
});

export const {
  setIsPlaying,
  setSelectedMoose,
  setVolume,
  setSightings,
  addSighting,
  updateSighting,
  deleteSighting,
  resetHomeState,
} = homeSlice.actions;

export default homeSlice.reducer;