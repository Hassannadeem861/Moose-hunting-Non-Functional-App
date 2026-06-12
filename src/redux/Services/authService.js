// TODO: [FUNCTIONAL] Implement each thunk when the body shop buddy API is ready.
// Steps to activate:
//   1. Confirm API endpoint paths with the backend team
//   2. Uncomment each thunk and fill in the correct endpoint + payload shape
//   3. Uncomment extraReducers in authSlice.js
//   4. Uncomment imports in authSlice.js

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { apiHandle, saveTokens, clearTokens } from '../../config/apiHandle';
// import { typeConstants } from '../../utils/constant';

// ── Check Auth (validate stored token on startup) ─────────────────────────────
// export const checkAuthAsync = createAsyncThunk(
//   typeConstants.CHECK_AUTH,
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.get('/auth/me');
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Login ─────────────────────────────────────────────────────────────────────
// export const loginAsync = createAsyncThunk(
//   typeConstants.LOGIN,
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.post('/auth/login', { email, password });
//       const { accessToken, refreshToken } = response.data;
//       await saveTokens(accessToken, refreshToken);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Signup ────────────────────────────────────────────────────────────────────
// export const signupAsync = createAsyncThunk(
//   typeConstants.SIGNUP,
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.post('/auth/signup', payload);
//       const { accessToken, refreshToken } = response.data;
//       await saveTokens(accessToken, refreshToken);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Logout ────────────────────────────────────────────────────────────────────
// export const logoutAsync = createAsyncThunk(
//   typeConstants.LOGOUT_AUTH,
//   async (_, { rejectWithValue }) => {
//     try {
//       await apiHandle.post('/auth/logout');
//       await clearTokens();
//       return true;
//     } catch (error) {
//       await clearTokens(); // always clear locally even if server call fails
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Forgot Password ───────────────────────────────────────────────────────────
// export const forgotPasswordAsync = createAsyncThunk(
//   typeConstants.FORGOT_PASSWORD,
//   async ({ email }, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.post('/auth/forgot-password', { email });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Verify OTP ────────────────────────────────────────────────────────────────
// export const verifyOtpAsync = createAsyncThunk(
//   typeConstants.VERIFY_OTP,
//   async ({ email, otp }, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.post('/auth/verify-otp', { email, otp });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );

// ── Reset Password ────────────────────────────────────────────────────────────
// export const resetPasswordAsync = createAsyncThunk(
//   typeConstants.RESET_PASSWORD,
//   async ({ token, newPassword }, { rejectWithValue }) => {
//     try {
//       const response = await apiHandle.post('/auth/reset-password', { token, newPassword });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error?.response?.data?.message || error.message);
//     }
//   },
// );
