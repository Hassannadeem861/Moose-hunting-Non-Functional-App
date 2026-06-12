import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: [FUNCTIONAL] Uncomment when authSlice is ready
// import authReducer from './Slices/authSlice';
import homeReducer from './Slices/homeSlice';
import recordingReducer from './Slices/recordingSlice';
import themeReducer from './Slices/themeSlice';

// ─── Redux Persist Configuration ──────────────────────────────────────────────
// Redux Persist se Redux state ko AsyncStorage mein save karenge
// Taake app restart ke baad bhi state preserve rahe
const persistConfig = {
  key: 'root', // localStorage key ka naam
  storage: AsyncStorage, // React Native mein AsyncStorage use karenge
  whitelist: ['theme'], // Sirf theme state ko persist karengy, باقی states ko nahi
};

// ─── Root Reducer Combine Karo ────────────────────────────────────────────────
// combineReducers se tamam reducers ko combine kar do
const rootReducer = combineReducers({
  home: homeReducer,
  recording: recordingReducer,
  theme: themeReducer,
});

// ─── Persisted Reducer Banao ──────────────────────────────────────────────────
// persistReducer se rootReducer ko wrap kar do
// Yeh persist configuration apply karega
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ─── Store Configuration ──────────────────────────────────────────────────────
export const store = configureStore({
  reducer: persistedReducer, // ✅ persistedReducer ko use karo (pehle individual reducers the)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist serializable checks ko disable karo
    }),
});

// ─── Persistor Create Karo ────────────────────────────────────────────────────
// Persistor se app start par Redux state ko AsyncStorage se load karengy
export const persistor = persistStore(store);