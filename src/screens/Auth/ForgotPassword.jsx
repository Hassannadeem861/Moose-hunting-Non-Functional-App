import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
import { useNavigation, useTheme } from '@react-navigation/native';
import {Formik} from 'formik';
import colors from '../../utils/color.js';
import { ICON } from '../../utils/authImages.js';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import {fs, vh, vw} from '../../utils/responsive.js';
// import {useDispatch, useSelector} from 'react-redux';
// import {getValidationSchema} from '../../utils/validationSchema.js';
// import {forgotPasswordAsync} from '../../redux/Services/authService.js';
// import {setforgotpasswordStatus} from '../../redux/Slices/authSlice.js';
// import {asyncStatus} from '../../utils/asyncStatus.js';

const ForgotPassword = () => {
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
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // const {forgot_password_status, forgot_password_data, forgot_password_error} =
  //   useSelector(state => state?.auth || {});

  // const loader = forgot_password_status === asyncStatus.LOADING;

  const errorText = (fieldName, touched, errors) => {
    if (!touched[fieldName] || !errors[fieldName]) {
      return null;
    }

    return <Text style={styles.errorText}>{errors[fieldName]}</Text>;
  };

const handleForgot = (values) => {
  navigation.navigate('forget_password_account_verification', {
    type: 'forget_password_account_verification',
  });
}

  // const handleForgot = values => {
  //   const payload = {
  //     email: values.email.trim(),
  //   };
  //   setSubmittedEmail(payload.email);
  //   dispatch(setforgotpasswordStatus());
  //   setHasSubmitted(true);
  //   dispatch(forgotPasswordAsync(payload));
  // };

  // useEffect(() => {
  //   if (forgot_password_status === asyncStatus.SUCCEEDED) {
  //     navigation.reset({
  //       index: 0,
  //       routes: [
  //         {
  //           name: 'VerifyOtp',
  //           params: {
  //             email: forgot_password_data?.data?.email || submittedEmail,
  //             otpForDev: forgot_password_data?.data?.otpForDev,
  //             type: 'forgotPassword',
  //           },
  //         },
  //       ],
  //     });
  //     dispatch(setforgotpasswordStatus());
  //     setHasSubmitted(false);
  //   }
  // }, [forgot_password_status, forgot_password_data, submittedEmail, navigation, dispatch]);

  // useEffect(() => {
  //   if (
  //     forgot_password_status === asyncStatus.ERROR &&
  //     forgot_password_error &&
  //     hasSubmitted
  //   ) {
  //     Alert.alert('Request Failed', forgot_password_error);
  //     dispatch(setforgotpasswordStatus());
  //     setHasSubmitted(false);
  //   }
  // }, [forgot_password_status, forgot_password_error, hasSubmitted, dispatch]);

  const handleBlockedBack = () => {
    Alert.alert('Please Continue', onboardingMessage);
  };

  return (
    <AuthScreenWrapper style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <MainHeader containerStyle={{ paddingHorizontal: vw(5) }} />

            <View style={styles.container}>
              <CustomHeading
                containerStyle={styles.textContainer}
                heading="Forgot Password?"
                paragraph="Enter the phone associated with your account and we’ll send an sms with code to reset your password"
                color={themeColors.text}
                paragraphColor={themeColors.text === colors.white ? colors.textHint : colors.description}
                center={false}
                headingFontSize={28}
                paragraphFontSize={14}
                headingFontFamily={FONTS.display_medium}
                paragraphFontFamily={FONTS.display_regular}
              />

              <Formik
                initialValues={{
                  email: '',
                }}
                // validationSchema={getValidationSchema('email')}
                onSubmit={handleForgot}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  setFieldTouched,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <View style={styles.formContainer}>
                    <View style={styles.inputSection}>
                      <CustomInput
                        label="Email"
                        placeholder="Enter your Phone"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email', true)}
                        image={ICON.EMAIL}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        islabelshown={false}
                      />
                      {/* {errorText('email', touched, errors)} */}
                    </View>

                    <View style={styles.buttonSection}>
                      <CustomButton
                        onPress={handleSubmit}
                        title={'Confirm'}
                        // title={loader ? 'Submitting...' : 'Submit'}
                        // disabled={isSubmitting || loader}
                      />
                    </View>
                  </View>
                )}
              </Formik>
                </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AuthScreenWrapper>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: vw(5),
    paddingBottom: vh(2.5),
  },
  textContainer: {
    marginTop: vh(2),
    marginBottom: vh(3),
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputSection: {
    marginTop: vh(0.5),
  },
  errorText: {
    color: '#D32F2F',
    fontSize: fs(12),
    marginTop: -4,
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: FONTS.display_regular,
  },
  buttonSection: {
    marginBottom: vh(2.5),
  },
});
