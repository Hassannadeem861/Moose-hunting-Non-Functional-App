import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import colors from '../../utils/color';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../../assets/OboardingScreens/OboardingScreens1.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        {/* ── Bottom gradient overlay ── */}
        <LinearGradient
          colors={[
            'transparent',
            'rgba(10,26,13,0.55)',
            'rgba(10,26,13,0.97)',
          ]}
          locations={[0, 0.42, 1]}
          style={styles.gradient}
        >
          <Text style={styles.title}>
            Welcome to{'\n'}Moose Calling 101
          </Text>

          <Text style={styles.description}>
            Get ready to master moose calling and enhance your hunting
            experience. We'll guide you through a simple process to
            help you get started.
          </Text>

          <CustomButton
            title="Let's Get Started"
            onPress={() => navigation.navigate('create_account')}
            variant="primary"
          />

          <View style={{ height: vh(3) }} />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.forestDark,
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  gradient: {
    paddingHorizontal: vw(6),
    // paddingTop: vh(5),
    paddingBottom: vh(7),
  },
  title: {
    fontSize: fs(24),
    fontFamily: FONTS.display_bold,
    fontWeight: '600',
    color: colors.white,
    marginBottom: vh(1.4),
    lineHeight: fs(32),
  },
  description: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: colors.white,
    lineHeight: fs(19),
    marginBottom: vh(3),
  },
});