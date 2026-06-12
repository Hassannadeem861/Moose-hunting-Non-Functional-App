// TODO: [FUNCTIONAL] Implement each thunk when API is ready.
// Same pattern as authService.js
// Steps to activate:
//   1. Confirm API endpoint paths with backend team
//   2. Uncomment each thunk + fill in endpoint & payload shape
//   3. Uncomment extraReducers in homeSlice.js

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { apiHandle } from '../../config/apiHandle';
// import { typeConstants } from '../../utils/constant';

// ── Fetch All Sightings ───────────────────────────────────────────────────────
// export const fetchSightingsAsync = createAsyncThunk(
//   typeConstants.FETCH_SIGHTINGS,
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.get('/sightings');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Add New Sighting ──────────────────────────────────────────────────────────
// export const addSightingAsync = createAsyncThunk(
//   typeConstants.ADD_SIGHTING,
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.post('/sightings', payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Update Sighting ───────────────────────────────────────────────────────────
// export const updateSightingAsync = createAsyncThunk(
//   typeConstants.UPDATE_SIGHTING,
//   async ({ id, ...payload }, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.put(`/sightings/${id}`, payload);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Delete Sighting ───────────────────────────────────────────────────────────
// export const deleteSightingAsync = createAsyncThunk(
//   typeConstants.DELETE_SIGHTING,
//   async (id, { rejectWithValue }) => {
//     try {
//       await apiHandle.delete(`/sightings/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );