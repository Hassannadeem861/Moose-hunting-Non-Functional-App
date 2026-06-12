import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../components/CustomButton/CustomButton';
import colors from '../../utils/color';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const CreateAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ── Full screen background image ── */}
      <ImageBackground
        source={require('../../assets/OboardingScreens/OboardingScreens2.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.topOverlay} />

        <LinearGradient
          colors={[
            'transparent',
            'rgba(5, 15, 7, 0.78)',
            'rgba(5, 15, 7, 0.97)',
            '#050f07',
          ]}
          locations={[0, 0.38, 0.62, 1]}
          style={styles.bottomGradient}
        >
          {/* ── Content ── */}
          <View style={styles.content}>

            <Text style={styles.title}>Create Your Account</Text>

            <Text style={styles.subtitle}>
              Sign up to save your favorite calls, track your hunting
              spots, and access personalized features.
            </Text>

            <CustomButton
              title="Sign up with Email"
              onPress={() => navigation.navigate('signup')}
              variant="primary"
              style={styles.btnSpacing}
            />

            <Text style={styles.orText}>Or</Text>

            {/* Outline buttons */}
            <CustomButton
              title="Login with Facebook"
              onPress={() => { /* Facebook SDK */ }}
              variant="outline"
              style={styles.btnSpacing}
            />

            <CustomButton
              title="Continue as Guest"
              onPress={() => navigation.navigate('home_screen')}
              variant="outline"
              style={styles.btnSpacing}
            />
          </View>
        </LinearGradient>

      </ImageBackground>
    </View>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
  },

  // ── Full screen image ─────────────────────────────────────────────
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',   
  },

  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: vh(45),              
    // backgroundColor: 'rgba(5, 15, 7, 0.15)',
  },

  bottomGradient: {
    paddingTop: vh(4),
  },

  // ── Content ──────────────────────────────────────────────────────
  content: {
    paddingHorizontal: vw(6),
    paddingBottom: vh(5),
  },
  title: {
    fontSize: fs(24),
    fontFamily: FONTS.display_bold,
    color: colors.white,
    marginBottom: vh(1),
  },
  subtitle: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: colors.white,
    lineHeight: fs(19),
    marginBottom: vh(3),
  },
  btnSpacing: {
    marginBottom: vh(1.5),
  },
  orText: {
    textAlign: 'center',
    fontSize: fs(12),
    fontWeight: '500',
    fontFamily: FONTS.display_regular,
    color: colors.white,
    marginVertical: vh(0.8),
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh(2.5),
  },
  loginPrompt: {
    fontSize: fs(12),
    fontFamily: FONTS.display_regular,
    color: 'rgba(255,255,255,0.45)',
  },
  loginLink: {
    fontSize: fs(12),
    fontFamily: FONTS.display_medium,
    color: colors.lightYellow,
  },
});