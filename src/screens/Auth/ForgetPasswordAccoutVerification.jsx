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
  Platform,
} from 'react-native';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
import { FONTS } from '../../utils/fonts.js';
import colors from '../../utils/color.js';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { useNavigation, useTheme } from '@react-navigation/native';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { ROLES } from '../../utils/helper.js';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { fs, vh, vw } from '../../utils/responsive.js';
// // import { useDispatch, useSelector } from 'react-redux';
// import { asyncStatus } from '../../utils/asyncStatus.js';
// import { setVerifyOTPStatus } from '../../redux/Slices/authSlice.js';
// import { verifyForgotOTPAsync } from '../../redux/Services/authService.js';

const VerifyOtp = ({ route }) => {
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

  // const { verify_otp_status, verify_otp_error } = useSelector(
  //   state => state?.auth || {},
  // );

  // const isLoading = verify_otp_status === asyncStatus.LOADING;
  // console.log('User Type in VerifyOtp:', userType);

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
    navigation.navigate('create_new_password', {
      // email: email,
      OTP: otp.join(''),
      // userType: userType || ROLES.CLIENT,
    });
  }

  // const collectOtp = () => {
  //   const otpValue = otp.join('');
  //   if (otpValue.length !== otp.length) {
  //     Alert.alert('OTP Required', 'Please enter the full OTP code.');
  //     return;
  //   }

  //   if (type !== 'forgotPassword') {
  //     navigation.reset({
  //       index: 0,
  //       routes: [
  //         {
  //           name: 'CreatenewPassword',
  //           params: {
  //             email: email,
  //             OTP: otpValue,
  //             userType: userType || ROLES.CLIENT,
  //           },
  //         },
  //       ],
  //     });
  //     return;
  //   }

  //   dispatch(setVerifyOTPStatus());
  //   setHasSubmittedOtp(true);

  //   dispatch(
  //     verifyForgotOTPAsync({
  //       email,
  //       otp: otpValue,
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   if (verify_otp_status === asyncStatus.SUCCEEDED && hasSubmittedOtp) {
  //     navigation.reset({
  //       index: 0,
  //       routes: [
  //         {
  //           name: 'CreatenewPassword',
  //           params: {
  //             email: email,
  //             OTP: otp.join(''),
  //             userType: userType || ROLES.CLIENT,
  //           },
  //         },
  //       ],
  //     });

  //     dispatch(setVerifyOTPStatus());
  //     setHasSubmittedOtp(false);
  //   }
  // }, [verify_otp_status, hasSubmittedOtp, email, otp, userType, navigation, dispatch]);

  // useEffect(() => {
  //   if (verify_otp_status === asyncStatus.ERROR && verify_otp_error && hasSubmittedOtp) {
  //     Alert.alert('Verification Failed', verify_otp_error);
  //     dispatch(setVerifyOTPStatus());
  //     setHasSubmittedOtp(false);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.container}>
              <MainHeader onBackPress={handleBlockedBack} />
              <View style={styles.content}>
                <View style={styles.titleContainer}>
                  <CustomHeading
                    heading="Verification Phone Number"
                    paragraph="A verification code has been sent to +1 (••• ••• 1234). Enter the code to continue."
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
                  <TouchableOpacity
                    onPress={resendOtp}
                    style={styles.resendButton}
                  >
                    <Text style={[styles.resendText, dynamicStyles.resendText]}>Re-send code</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <CustomButton
                  style={{ marginBottom: 10 }}
                  onPress={collectOtp}
                  title={'Confirm'}
                  // title={isLoading ? 'Verifying...' : 'Submit'}
                  // disabled={isLoading}
                />

                {/* <View style={styles.bottomTextContainer}>
                  <Text style={styles.bottomText}>
                    Didn’t get the code? Please check your SMS or use{' '}
                    <TouchableOpacity onPress={handleAnotherEmail}>
                      <Text style={styles.linkText}>Another number.</Text>
                    </TouchableOpacity>
                  </Text>
                </View> */}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AuthScreenWrapper>
  );
};

export default VerifyOtp;

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
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingTop: vh(1),
  },
  titleContainer: {
    marginBottom: vh(4.2),
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
    marginTop: vh(0.4),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: vw(2),
    gap: vw(2.2),
    marginBottom: vh(3.8),
  },
  otpInput: {
    width: vw(14.8),
    height: vw(14.8),
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: vw(3.2),
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
  },
  resendButton: {
    // paddingVertical: 8,
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
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 24,
  },
  submitButtonContainer: {
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: FONTS.display_bold,
    color: '#000000',
  },
  bottomTextContainer: {
    alignItems: 'center',
  },
  bottomText: {
    fontFamily: FONTS.display_regular,
    color: colors.description,
    fontSize: 13,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.display_regular,
    color: colors.lightYellow,
    fontWeight: '700',
    fontSize: 13,
  },
});
