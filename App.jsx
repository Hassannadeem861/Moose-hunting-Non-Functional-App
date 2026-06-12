import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './src/navigation/AppNavigation.jsx';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';


const App = () => {
  return (
    <Provider store={store}>
      {/* ── PersistGate ── */}
      {/* Redux Persist se app start par saved state ko load karne mein time lagta hai */}
      {/* PersistGate se app tabhi render hoga jab state load ho jaye */}
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <AppNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})