// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SAVE_TOKENS_CONSTANT } from '../utils/constant';
// import RNRestart from 'react-native-restart';

// // TODO: [FUNCTIONAL] Replace with the body shop buddy backend URL when available
// export const baseURL = 'https://body-shop-buddy-backend.herokuapp.com/api/v1';
// // export const baseURL = 'http://192.168.18.55:5002/api';

// export const apiHandle = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 15000,
// });
// const API_LOG_ENABLED = __DEV__;
// const API_LOG_VERBOSE = false;

// const safeJson = value => {
//   try {
//     return JSON.stringify(value, null, 2);
//   } catch (_error) {
//     return '[Unserializable data]';
//   }
// };

// const getRequestLabel = (req) => {
//   const method = (req?.method || 'GET').toUpperCase();
//   const url = `${req?.baseURL || ''}${req?.url || ''}`;
//   return `${method} ${url}`;
// };

// const logApi = (...args) => {
//   if (API_LOG_ENABLED) {
//     console.log(...args);
//   }
// };

// // Request interceptor - Add token
// apiHandle.interceptors.request.use(async req => {
//   console.log("req",req);
  
//   req.metadata = { startTime: Date.now() };
//   const { accessToken } = await getTokens();

//   if (accessToken) {
//     req.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   logApi(`[API] -> ${getRequestLabel(req)}`);
//   if (API_LOG_VERBOSE && req?.params && Object.keys(req.params).length > 0) {
//     logApi('  params:', safeJson(req.params));
//   }
//   if (API_LOG_VERBOSE && req?.data) {
//     logApi('  body:', safeJson(req.data));
//   }

//   return req;
// });

// // Response interceptor - Handle token refresh
// apiHandle.interceptors.response.use(
//   response => {
//     const duration = Date.now() - (response?.config?.metadata?.startTime || Date.now());
//     logApi(
//       `[API] <- ${getRequestLabel(response?.config)} ${response?.status} (${duration}ms)`,
//     );
//     if (API_LOG_VERBOSE) {
//       logApi('  response:', safeJson(response?.data));
//     }
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;
//     const duration = Date.now() - (originalRequest?.metadata?.startTime || Date.now());

//     logApi(
//       `[API] xx ${getRequestLabel(originalRequest)} ${error?.response?.status || 'NO_STATUS'} (${duration}ms)`,
//     );
//     logApi(`  error: ${error?.message || 'Unknown error'}`);
//     if (error?.response?.data) {
//       logApi('  errorData:', safeJson(error.response.data));
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { refreshToken } = await getTokens();
//         logApi('[API REFRESH] trying refresh-token');
//         if (!refreshToken) {
//           logApi('[API REFRESH] no refresh token, clearing session');
//           await clearTokens();
//           return Promise.reject(error);
//         }

//         // Call the refresh token API
//         const response = await axios.post(`${baseURL}/auth/refresh-token`, {
//           refreshToken: refreshToken,
//         });
//         const newAccessToken = response.data.accessToken; // only token returned

//         if (!newAccessToken) {
//           logApi('[API REFRESH] no access token in refresh response');
//           await clearTokens();
//           return Promise.reject(new Error('No access token returned'));
//         }

//         // Save only access token (no new refresh token provided)
//         await saveTokens(newAccessToken, refreshToken);
//         logApi('[API REFRESH] success, retrying original request');

//         // Retry original request
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return apiHandle(originalRequest);
//       } catch (refreshError) {
//         logApi(`[API REFRESH] failed: ${refreshError?.message || refreshError}`);
//         await clearTokens();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// export const _sessionExpired = async () => {
//   try {
//     await AsyncStorage.clear();
//     RNRestart.restart();
//   } catch (error) {
//     console.error('Failed to clear data:', error);
//   }
// };

// // Get tokens from storage
// export const getTokens = async () => {
//   const accessToken = await AsyncStorage.getItem(
//     SAVE_TOKENS_CONSTANT.ACCESS_TOKEN,
//   );
//   const refreshToken = await AsyncStorage.getItem(
//     SAVE_TOKENS_CONSTANT.REFRESH_TOKEN,
//   );
//   return { accessToken, refreshToken };
// };

// // Save tokens to storage
// export const saveTokens = async (accessToken, refreshToken) => {
//   await AsyncStorage.multiSet([
//     [SAVE_TOKENS_CONSTANT.ACCESS_TOKEN, accessToken],
//     [SAVE_TOKENS_CONSTANT.REFRESH_TOKEN, refreshToken],
//   ]);
// };

// // Clear tokens
// export const clearTokens = async () => {
//   // console.log('Clearing tokens');
//   await AsyncStorage.multiRemove([
//     SAVE_TOKENS_CONSTANT.ACCESS_TOKEN,
//     SAVE_TOKENS_CONSTANT.REFRESH_TOKEN,
//   ]);
//   // RNRestart.restart();
// };
