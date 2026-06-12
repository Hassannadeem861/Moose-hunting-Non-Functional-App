import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Video from 'react-native-video';
import colors from '../../utils/color';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { dark, colors: themeColors } = useTheme();
  const isDarkTheme = Boolean(dark);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


   useEffect(() => {
    const timer = setTimeout(async () => {
      navigation.navigate("loading_screen");

    //   const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
    //  console.log("hasSeenIntro: ", hasSeenIntro)
      // if (hasSeenIntro) {
      //   navigation.navigate("bottom_tab");
      // } else {
      //   navigation.navigate("intro_splash_screen");
      // }
    }, 3000)

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleLogoPress = () => {
    setIsPlaying(prev => !prev);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };
  

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />

      {/* ── Forest background image ── */}
      <ImageBackground
        source={require('../../assets/SplashScreen/SplashScreenBackground1.png')}
        style={[styles.bg, { backgroundColor: themeColors.background }]}
        resizeMode="cover"
      >
        {/* Dark overlay */}
        <View style={[styles.overlay, { backgroundColor: isDarkTheme ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.18)' }]} />

        {/* ── Video (plays behind logo when active) ── */}
        {/* {isPlaying && (
          <Video
            ref={videoRef}
            source={require('../../assets/SplashScreen/moose-video.mp4')}
            style={[StyleSheet.absoluteFillObject, { zIndex: 2 }]}
            resizeMode="cover"
            paused={!isPlaying}
            onEnd={handleVideoEnd}
            zIndex={5}
          />
        )} */}

        {/* ── Logo circle (tap to play/pause) ── */}
        <TouchableOpacity
          style={styles.logoWrapper}
          onPress={handleLogoPress}
          activeOpacity={0.85}
        >
            <Image
              source={require('../../assets/SplashScreen/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />

          {/* <Text style={styles.tapHint}>
            {isPlaying ? '⏸  Tap to pause' : '▶  Tap logo to play'}
          </Text> */}
        </TouchableOpacity>

      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.forestDark,
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.forestOverlay,
    zIndex: 1,
  },
  logoWrapper: {
    alignItems: 'center',
    zIndex: 10,
  },
  logoCircle: {
    width: vw(40),
    height: vw(40),
    borderRadius: vw(20),
    backgroundColor: colors.forestOverlayDeep,
    borderWidth: 2.5,
    borderColor: colors.borderGold,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: vw(40),
    height: vw(40),
  },
  tapHint: {
    marginTop: vh(1.5),
    fontSize: fs(11),
    fontFamily: FONTS.display_regular,
    color: 'rgba(255,223,0,0.8)',
    letterSpacing: 0.5,
  },
  skipBtn: {
    position: 'absolute',
    bottom: vh(5),
    right: vw(6),
    zIndex: 10,
    paddingVertical: vh(0.8),
    paddingHorizontal: vw(4),
    borderRadius: vw(5),
    borderWidth: 1,
    borderColor: colors.btnOutlineBorder,
    backgroundColor: colors.btnOutlineBg,
  },
  skipText: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: colors.white,
  },
});