import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../../utils/color';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const RING_SIZE = vw(22);   // ring diameter
const RADIUS = RING_SIZE / 2 - 5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const LOAD_DURATION = 3000;  // ms to reach 100%

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = 100;
    const interval = LOAD_DURATION / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(timer);
        // Navigate to onboarding after brief pause
        setTimeout(() => navigation.replace('onboarding_screen'), 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [navigation]);

  const strokeOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../../assets/SplashScreen/SplashScreenBackground2.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* dark overlay */}
        <View style={styles.overlay} />

        {/* ── Animated progress ring ── */}
        <View style={styles.ringWrapper}>
          <Svg
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          >
            {/* Track */}
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              stroke={colors.borderGold}
              strokeWidth={3.5}
              fill="none"
              opacity={0.3}
            />

            {/* Progress */}
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              stroke={colors.lightYellow}
              strokeWidth={3.5}
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              rotation="-90"
              origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
            />
          </Svg>

          {/* Percentage Center Text */}
          <View style={styles.percentBox}>
            <Text style={styles.percentText}>{progress}%</Text>
          </View>
        </View>

      </ImageBackground>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.forestDark,
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.forestOverlay,
  },
  ringWrapper: {
    marginBottom: vh(7),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  percentBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  percentText: {
    fontSize: fs(12),
    fontFamily: FONTS.display_bold,
    color: colors.lightYellow,
  },
});