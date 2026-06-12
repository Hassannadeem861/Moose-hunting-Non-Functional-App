import { createSlice } from '@reduxjs/toolkit';

// ─── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  recordings: [],             // saved attempts list
  isRecording: false,
  recordingTime: 0,
  isLoading: false,
  error: null,

  // TODO: [FUNCTIONAL] Uncomment when API ready
  // fetch_status: 'idle',
  // save_status: 'idle',
  // delete_status: 'idle',
};

const recordingSlice = createSlice({
  name: 'recording',
  initialState,
  reducers: {
    // ── Recording state ──────────────────────────────────────────────────
    setIsRecording: (state, action) => {
      state.isRecording = action.payload;
    },
    setRecordingTime: (state, action) => {
      state.recordingTime = action.payload;
    },
    incrementRecordingTime: (state) => {
      state.recordingTime += 1;
    },
    resetRecordingTime: (state) => {
      state.recordingTime = 0;
    },

    // ── Recordings CRUD ──────────────────────────────────────────────────
    setRecordings: (state, action) => {
      state.recordings = action.payload;
      state.isLoading = false;
    },
    addRecording: (state, action) => {
      state.recordings.unshift(action.payload);
    },
    deleteRecording: (state, action) => {
      state.recordings = state.recordings.filter(r => r.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetRecordingState: () => initialState,
  },

  // TODO: [FUNCTIONAL] Uncomment extraReducers when API services ready
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchRecordingsAsync.pending, (state) => { state.isLoading = true; })
  //     .addCase(fetchRecordingsAsync.fulfilled, (state, action) => {
  //       state.recordings = action.payload;
  //       state.isLoading = false;
  //     })
  //     .addCase(fetchRecordingsAsync.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const {
  setIsRecording,
  setRecordingTime,
  incrementRecordingTime,
  resetRecordingTime,
  setRecordings,
  addRecording,
  deleteRecording,
  setLoading,
  setError,
  resetRecordingState,
} = recordingSlice.actions;

export default recordingSlice.reducer;