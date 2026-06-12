import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
import { FONTS } from '../../utils/fonts.js';
import colors from '../../utils/color.js';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { useNavigation, useTheme } from '@react-navigation/native';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
// import { ROLES } from '../../utils/helper.js';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifySignupOTPAsync } from '../../redux/Services/authService.js';
// import { asyncStatus } from '../../utils/asyncStatus.js';
import { fs, vh, vw } from '../../utils/responsive.js';
// import { setVerifyOTPStatus } from '../../redux/Slices/authSlice.js';

const VerificationOtp = ({ route }) => {
  const { email = 'info@gmail.com', type, userType } = route.params || {};
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  // const dispatch = useDispatch();
  const onboardingMessage =
    'You are in onboarding flow. Please complete this step and continue.';

  // ── Dynamic Styles ──
  const dynamicStyles = StyleSheet.create({
    mainTitle: {
      color: themeColors.text,
    },
    subtitle: {
      color: themeColors.text === colors.white ? colors.textHint : colors.description,
    },
    resendText: {
      color: themeColors.text === colors.white ? colors.textHint : colors.description,
    },
  });
    
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [hasSubmittedOtp, setHasSubmittedOtp] = useState(false);
  const inputs = useRef([]);
  
  // const { verify_otp_status, verify_otp_error, user_data } = useSelector(
  //   state => state?.auth || {},
  // );
  // console.log('User Type in VerifyOtp:', userType);
  // console.log('User Data in VerifyOtp:', user_data);

  // const isLoading = verify_otp_status === asyncStatus.LOADING;

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        // Current box is already empty — clear the previous box and move back
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const collectOtp = () => {
    navigation.navigate('join_trusted_community', {
      email,
      userType: type === 'signup' ? userType : null,
    });
  };

  // const collectOtp = () => {
  //   const otpValue = otp.join('');
  //   if (otpValue.length !== otp.length) {
  //     Alert.alert('OTP Required', 'Please enter the full OTP code.');
  //     return;
  //   }

  //   console.log('Collected OTP:', otpValue);

  //   dispatch(setVerifyOTPStatus());
  //   setHasSubmittedOtp(true);

  //   // FIXED: Use actual user email from Redux, not hardcoded fallback
  //   const actualEmail = user_data?.user?.email || email || 'info@gmail.com';
  //   console.log('[PhoneVerification] Verifying OTP with email:', actualEmail);

  //   dispatch(
  //     verifySignupOTPAsync({
  //       email: actualEmail,
  //       otp: otpValue,
  //     }),
  //   );
  // };

  // TODO: [FUNCTIONAL] Restore these useEffects when Redux is wired:
  //   if (verify_otp_status === asyncStatus.SUCCEEDED) {
  //     console.log('[PhoneVerification] OTP verified, navigating to profile setup...');
  //     const userRole = userType || user_data?.user?.role;
  //     const routeScreen = userRole === ROLES.AGENT ? 'CreateProfile' : 'CreateClientProfile';

  //     console.log('[PhoneVerification] Selected route:', routeScreen, 'for role:', userRole);

  //     // Use navigation.navigate instead of reset to allow proper stack navigation
  //     setTimeout(() => {
  //       navigation.navigate(routeScreen, {
  //         email: email || user_data?.user?.email,
  //         userType: userRole,
  //       });
  //       setHasSubmittedOtp(false);
  //     }, 500);
  //   }
  // }, [verify_otp_status, navigation, email, userType, user_data?.user?.role]);

  // useEffect(() => {
  //   if (verify_otp_status === asyncStatus.ERROR && verify_otp_error && hasSubmittedOtp) {
  //     Alert.alert('Verification Failed', verify_otp_error);
  //     setHasSubmittedOtp(false);
  //     dispatch(setVerifyOTPStatus());
  //   }
  // }, [verify_otp_status, verify_otp_error, hasSubmittedOtp, dispatch]);

  const resendOtp = () => {
    Alert.alert('Info', 'A new OTP has been sent to your email.');
  };

  const handleAnotherEmail = () => {
    navigation.navigate('UpdateEmail');
  };

  const handleBlockedBack = () => {
    Alert.alert('Please Continue', onboardingMessage);
  };

  return (
    <AuthScreenWrapper style={styles.safeArea}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.container}>
              {/* <MainHeader onBackPress={() => navigation.goBack()} /> */}
              <MainHeader onBackPress={handleBlockedBack} />
              <View style={styles.content}>
                <View style={styles.titleContainer}>
                  <CustomHeading
                    heading="Verify OTP"
                    paragraph="Enter your OTP which has been sent to your email and completely verify your account."
                    color={themeColors.text}
                    paragraphColor={themeColors.text === colors.white ? colors.textHint : colors.description}
                    center={false}
                    headingFontSize={28}
                    paragraphFontSize={14}
                    headingFontFamily={FONTS.display_medium}
                    paragraphFontFamily={FONTS.display_regular}
                  />
                  {/* <Text style={styles.emailText}>{email}</Text> */}
                </View>

                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={[styles.otpInput, digit && styles.otpInputFilled]}
                      keyboardType="number-pad"
                      maxLength={1}
                      value={digit}
                      onChangeText={value => handleOtpChange(value, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      ref={ref => (inputs.current[index] = ref)}
                    />
                  ))}
                </View>

                <View style={styles.resendContainer}>
                  <Text style={[styles.resendText, dynamicStyles.resendText]}>
                    A code has been sent to your Email
                  </Text>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <CustomButton
                  style={{ marginBottom: 10 }}
                  onPress={collectOtp}
                  title={'Confirm'}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AuthScreenWrapper>
  );
};

export default VerificationOtp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: vw(6.4),
    marginTop: vh(2),
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  titleContainer: {
    marginBottom: vh(4.8),
  },
  mainTitle: {
    // fontFamily: FONTS.display_medium,
    fontSize: 28,
    color: colors.black,
    marginBottom: 8,
    fontWeight: '500',
  },
  subtitle: {
    // fontFamily: FONTS.display_regular,
    fontSize: 14,
    color: colors.description,
    lineHeight: 20,
  },
  emailText: {
    fontFamily: FONTS.display_regular,
    fontWeight: '700',
    color: colors.black,
    marginTop: vh(0.2),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: vw(2.2),
    marginBottom: vh(2),
  },
  otpInput: {
    width: vw(15.2),
    height: vw(15.2),
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: vw(3.4),
    backgroundColor: colors.inputBackground,
    paddingHorizontal: vw(1),
    textAlign: 'center',
    fontSize: fs(18),
    fontFamily: FONTS.display_medium,
    color: colors.white,
  },
  otpInputFilled: {
    color: colors.white,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: vh(1.2),
  },
  resendButton: {
    paddingVertical: 8,
  },
  resendText: {
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: colors.description,
    fontWeight: '700',
  },
  bottomContainer: {
    paddingBottom: 10,
  },
  apiErrorText: {
    color: '#D32F2F',
    fontSize: fs(13),
    marginBottom: 10,
    fontFamily: FONTS.display_regular,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    fontFamily: FONTS.display_bold,
    color: '#000000',
  },
  bottomTextContainer: {
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: FONTS.display_regular,
    color: colors.gray,
    fontSize: 13,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.display_regular,
    color: colors.black,
    fontWeight: '700',
    fontSize: 13,
  },
});
