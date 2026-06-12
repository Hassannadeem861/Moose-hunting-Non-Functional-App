import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { ICON } from '../../utils/authImages';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color.js';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { getValidationSchema } from '../../utils/validationSchema.js';
import { fs, vh, vw } from '../../utils/responsive.js';
// import { loginAsync } from '../../redux/Services/authService.js';
// import { setLoginStatus } from '../../redux/Slices/authSlice.js';
// import { asyncStatus } from '../../utils/asyncStatus.js';

const Login = ({ route }) => {

  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();

  // const dispatch = useDispatch();

  const { userType } = route.params || {};

  const onboardingMessage =
    'You are in onboarding flow. Please complete this step and continue.';
  console.log('User Type in Login:', userType);

  const [hasSubmittedLogin, setHasSubmittedLogin] = useState(false);

  // ── Dynamic Styles ──
  const dynamicStyles = StyleSheet.create({
    mainTitle: {
      color: themeColors.text,
    },
    subtitle: {
      color: themeColors.text === colors.white ? colors.textHint : colors.description,
    },
    devToggleContainer: {
      backgroundColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.1)' : '#F5F5F5',
      borderColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.2)' : '#E0E0E0',
    },
    devToggleLabel: {
      color: themeColors.text === colors.white ? colors.textHint : '#888',
    },
    devToggleRole: {
      color: themeColors.text === colors.white ? colors.textMuted : '#aaa',
    },
    devToggleRoleActive: {
      color: themeColors.text === colors.white ? colors.white : '#222',
    },
    dividerLine: {
      backgroundColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.2)' : '#BEBEBE',
    },
    dividerText: {
      color: themeColors.text === colors.white ? colors.textMuted : '#7E7E7E',
    },
    signupText: {
      color: themeColors.text,
    },
  });

  // const { login_status, login_data, login_error } = useSelector(
  //   state => state?.auth || {},
  // );
  // console.log(login_status, 'login_status in login screen');
  // console.log(login_error, 'login_error in login screen');
  // console.log(login_data, 'login_data in login screen');

  // const loader = login_status === asyncStatus.LOADING;

  const errorText = (fieldName, touched, errors) => {
    if (!touched[fieldName] || !errors[fieldName]) {
      return null;
    }
    return <Text style={styles.errorText}>{errors[fieldName]}</Text>;
  };

  const handleLogin = async (values) => {
    // Navigate to profile creation as technician
    navigation.navigate('home_screen');
  };


  // const handleLogin = async values => {
  //   const valuesObj = {
  //     email: values.email.trim(),
  //     password: values.password,
  //   };

  //   dispatch(setLoginStatus());
  //   setHasSubmittedLogin(true);
  //   dispatch(loginAsync(valuesObj));
  // };

  // useEffect(() => {
  //   if (login_status === asyncStatus.SUCCEEDED) {
  //     // ✅ Don't navigate here! Let AppNavigation.jsx handle it based on Redux status
  //     // AppNavigation listens to user status changes and auto-navigates to correct home screen
  //     console.log('[Login] ✅ Login succeeded - AppNavigation will handle routing');

  //     dispatch(setLoginStatus());
  //     setHasSubmittedLogin(false);
  //   }
  // }, [login_status, login_data, userType, navigation, dispatch]);

  // useEffect(() => {
  //   if (login_status === asyncStatus.ERROR && login_error && hasSubmittedLogin) {
  //     Alert.alert('Login Failed', login_error);
  //     dispatch(setLoginStatus());
  //     setHasSubmittedLogin(false);
  //   }
  // }, [login_status, login_error, hasSubmittedLogin, dispatch]);

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
            <View style={styles.mainContainer}>
              <MainHeader />
              
              <CustomHeading
                containerStyle={styles.textContainer}
                heading="Login"
                paragraph="Enter your email address and password to login to your account."
                color={themeColors.text}
                paragraphColor={dynamicStyles.subtitle.color}
                center={false}
                headingFontSize={28}
                paragraphFontSize={14}
                headingFontFamily={FONTS.display_medium}
                paragraphFontFamily={FONTS.display_regular}
              />

              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                // validationSchema={getValidationSchema('login')}
                onSubmit={handleLogin}
              >
                {({
                  values,
                  handleChange,
                  errors,
                  touched,
                  isSubmitting,
                  setFieldTouched,
                  handleSubmit,
                }) => {
                  return (
                    <View style={styles.formContainer}>
                      <View>
                        <CustomInput
                          label="Email"
                          placeholder="Phone Number or Email"
                          image={ICON.EMAIL}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={() => setFieldTouched('email', true)}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          islabelshown={false}
                        />
                        {/* {errorText('email', touched, errors)} */}

                        <CustomInput
                          label="Password"
                          placeholder="Enter your Password"
                          isPassword={true}
                          image={ICON.PASSWORD}
                          value={values.password}
                          islabelshown={false}
                          onChangeText={handleChange('password')}
                          onBlur={() => setFieldTouched('password', true)}
                        />
                        {/* {errorText('password', touched, errors)} */}

                        <TouchableOpacity
                          onPress={() => navigation.navigate('forgot_password')}
                          style={styles.forgotPasswordContainer}
                        >
                          <Text style={styles.forgotPasswordText}>
                            Forgot Password?
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.bottomSection}>
                        <View style={styles.buttonContainer}>
                          <CustomButton
                            onPress={handleSubmit}
                            title={'Login'}
                          // title={loader ? 'Logging in...' : 'Login'}
                          // disabled={isSubmitting || loader}
                          // backgroundColor={colors.primary}
                          />
                        </View>

                       
                          <View style={styles.signupLinkContainer}>
                            <Text style={[styles.signupText, dynamicStyles.signupText]}>
                              Don't have an account?{' '}
                            </Text>
                            <TouchableOpacity
                              onPress={() => navigation.navigate('signup', { userType })}
                            >
                              <Text style={styles.signupLinkText}>Sign Up</Text>
                            </TouchableOpacity>
                          </View>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AuthScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: vw(4.3),
    paddingBottom: vh(2.5),
    paddingTop: vh(2),
  },
  backButton: {
    // marginTop: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textContainer: {
    marginTop: vh(2.2),
    marginBottom: vh(3.5),
  },
  mainTitle: {
    // fontFamily: FONTS.display_medium,
    fontSize: 28,
    marginBottom: 8,
    fontWeight: '500',
  },
  subtitle: {
    // fontFamily: FONTS.display_regular,
    fontSize: 14,
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  devToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: vw(3),
    paddingVertical: vh(1),
    marginBottom: vh(2),
    gap: 6,
    borderWidth: 1,
  },
  devToggleLabel: {
    fontSize: fs(11),
    fontWeight: '700',
    marginRight: 2,
  },
  devToggleRole: {
    fontSize: fs(11),
    fontWeight: '500',
  },
  devToggleRoleActive: {
    fontWeight: '700',
  },
  devSwitch: {
    marginHorizontal: 4,
  },
  forgotPasswordText: {
    color: colors.primary[0],
    fontSize: fs(12),
    fontWeight: '400',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: fs(12),
    marginTop: -4,
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: FONTS.display_regular,
  },
  buttonContainer: {
    marginBottom: 22,
  },
  bottomSection: {
    paddingBottom: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 18,
    fontSize: 14,
    fontFamily: FONTS.display_regular,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
    marginBottom: 34,
  },
  socialButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: vw(14.6),
    height: vw(14.6),
    resizeMode: 'contain',
  },
  signupLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    fontFamily: FONTS.display_regular,
  },
  signupLinkText: {
    fontSize: 14,
    fontFamily: FONTS.display_medium,
    color: colors.primary[0],
    fontWeight: '700',
  },
});
