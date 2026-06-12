import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

const backgroundImage = require('../assets/Setting/SettingBackground.png');

const SettingsScreenWrapper = ({
  children,
  style,
  contentContainerStyle,
}) => {
  const { dark, colors } = useTheme();

  // Light Theme
  if (!dark) {
    return (
      <SafeAreaView
        key="light-theme"
        style={[
          styles.safeArea,
          {
            backgroundColor: colors.background,
          },
          style,
        ]}
      >
        <View
          style={[
            styles.contentContainer,
            contentContainerStyle,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    );
  }

  // Dark Theme
  return (
    <ImageBackground
      key="dark-theme"
      source={backgroundImage}
      style={styles.background}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <SafeAreaView style={[styles.safeArea, style]}>
        <View
          style={[
            styles.contentContainer,
            contentContainerStyle,
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  image: {
    resizeMode: 'cover',
  },

  safeArea: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
  },
});

export default SettingsScreenWrapper;          