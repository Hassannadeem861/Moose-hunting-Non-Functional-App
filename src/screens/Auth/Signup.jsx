import React, { useEffect, useState } from 'react';
import {
    Image,
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
import { CommonActions, useNavigation, useTheme } from '@react-navigation/native';
import { Formik } from 'formik';
// import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { ICON } from '../../utils/authImages';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color.js';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
// import { ROLES } from '../../utils/helper.js';
// import { getValidationSchema } from '../../utils/validationSchema.js';
// import { signupAsync } from '../../redux/Services/authService.js';
// import { setSignupStatus } from '../../redux/Slices/authSlice.js';
// import { asyncStatus } from '../../utils/asyncStatus.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const SignUp = ({ route }) => {

    const navigation = useNavigation();
    const { colors: themeColors } = useTheme();
    // const dispatch = useDispatch();
    const { userType } = route.params || {};

    // ── Dynamic Styles ──
    const dynamicStyles = StyleSheet.create({
        mainTitle: {
            color: themeColors.text,
        },
        subtitle: {
            color: themeColors.text === colors.white ? colors.textHint : colors.description,
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
        termsText: {
            color: themeColors.text === colors.white ? colors.textHint : colors.description,
        },
        checkboxBorder: {
            borderColor: themeColors.text,
        },
    });
    const onboardingMessage =
        'You are in onboarding flow. Please complete this step and continue.';
    console.log('userType in signup: ', userType);

    const [submittedEmail, setSubmittedEmail] = useState('');
    const [hasSubmittedSignup, setHasSubmittedSignup] = useState(false);
    console.log("submittedEmail in signup screen: ", submittedEmail);

    //   const { signup_status, signup_data, signup_error  } = useSelector(
    //     state => state?.auth || {},
    //   );
    //   console.log('signup_data in signup screen: ', signup_data);
    //   console.log('signup_status in signup screen: ', signup_status);
    //   console.log('signup_error in signup screen: ', signup_error);

    //   const loader = signup_status === asyncStatus.LOADING;

    const errorText = (fieldName, touched, errors) => {
        if (!touched[fieldName] || !errors[fieldName]) {
            return null;
        }
        return <Text style={styles.errorText}>{errors[fieldName]}</Text>;
    };

    const toggleTerms = (values, setFieldValue, setFieldTouched) => {
        const nextValue = !values.agreedToTerms;
        setFieldValue('agreedToTerms', nextValue);
        setFieldTouched('agreedToTerms', true, false);
    };

    const handleSignup = async () => {
        navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'verify_otp',
                    params: {
                        email: submittedEmail,
                        type: 'signup',
                        userType: userType || 'technician',
                    },
                },
            ],
        })
    }

    //   const handleSignup = async (values) => {
    //     if (!values.agreedToTerms) {
    //       Alert.alert(
    //         'Terms Required',
    //         'Please accept the terms and conditions to continue.',
    //       );
    //       return;
    //     }

    //     const valuesObj = {
    //       email: values.email.trim(),
    //       phone: values.phone,
    //       password: values.password,
    //       confirmPassword: values.confirmPassword,
    //       role: userType || ROLES.TECHNICIAN,
    //     };

    //     console.log('Values object', valuesObj);
    //     dispatch(setSignupStatus());
    //     setHasSubmittedSignup(true);
    //     setSubmittedEmail(values.email.trim());
    //     dispatch(signupAsync(valuesObj));
    //   };

    //   useEffect(() => {
    //     if (signup_status === asyncStatus.SUCCEEDED) {
    //       navigation.reset({
    //         index: 0,
    //         routes: [
    //           {
    //             name: 'PhoneVerification',
    //             params: {
    //               email: submittedEmail || signup_data?.email || '',
    //               type: 'signup',
    //               userType: userType || ROLES.CLIENT,
    //             },
    //           },
    //         ],
    //       }),
    //         dispatch(setSignupStatus());
    //       setHasSubmittedSignup(false);
    //     }
    //   }, [signup_status, submittedEmail, signup_data, navigation, dispatch, userType]);

    //   useEffect(() => {
    //     if (signup_status === asyncStatus.ERROR && signup_error && hasSubmittedSignup) {
    //       Alert.alert('Signup Failed', signup_error);
    //       setHasSubmittedSignup(false);
    //       dispatch(setSignupStatus());
    //     }
    //   }, [signup_status, signup_error, hasSubmittedSignup, dispatch]);

    const handleBlockedBack = () => {
        navigation.goBack();
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
                            <MainHeader
                                onBackPress={handleBlockedBack}
                            />

                            <CustomHeading
                                containerStyle={styles.textContainer}
                                heading="Create an account"
                                paragraph="Join a space where kindness, privacy, and meaningful connections come first."
                                color={themeColors.text}
                                paragraphColor={themeColors.text === colors.white ? colors.textHint : colors.description}
                                center={false}
                                headingFontSize={28}
                                paragraphFontSize={14}
                                headingFontFamily={FONTS.display_medium}
                                paragraphFontamily={FONTS.display_regular}
                            />

                            <Formik
                                initialValues={{
                                    email: '',
                                    phone: '',
                                    password: '',
                                    confirmPassword: '',
                                    agreedToTerms: false,
                                }}
                                // validationSchema={getValidationSchema('signup')}
                                onSubmit={handleSignup}
                            >
                                {({
                                    values,
                                    handleChange,
                                    errors,
                                    touched,
                                    isSubmitting,
                                    setFieldValue,
                                    setFieldTouched,
                                    handleSubmit,
                                }) => {
                                    return (
                                        <View style={styles.formContainer}>
                                            <View>
                                                <CustomInput
                                                    label="Your full name"
                                                    placeholder="John Doe"
                                                    image={ICON.NAME}
                                                    value={values.name}
                                                    onChangeText={handleChange('name')}
                                                    onBlur={() => setFieldTouched('name', true)}
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                    islabelshown={false}
                                                />
                                                {/* {errorText('name', touched, errors)} */}
                                                <CustomInput
                                                    label="Email"
                                                    placeholder="info@gmail.com"
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
                                                    label="Phone"
                                                    placeholder="Enter your phone number"
                                                    image={ICON.PHONE}
                                                    value={values.phone}
                                                    onChangeText={handleChange('phone')}
                                                    onBlur={() => setFieldTouched('phone', true)}
                                                    keyboardType="phone-pad"
                                                    autoCapitalize="none"
                                                    islabelshown={false}
                                                />
                                                {/* {errorText('phone', touched, errors)} */}

                                                <CustomInput
                                                    label="Password"
                                                    placeholder="Create a password"
                                                    isPassword={true}
                                                    islabelshown={false}
                                                    image={ICON.PASSWORD}
                                                    value={values.password}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={() => setFieldTouched('password', true)}
                                                />
                                                {/* {errorText('password', touched, errors)} */}

                                                <CustomInput
                                                    label="Confirm Password"
                                                    placeholder="Re-enter your password"
                                                    isPassword={true}
                                                    image={ICON.PASSWORD}
                                                    islabelshown={false}
                                                    value={values.confirmPassword}
                                                    onChangeText={handleChange('confirmPassword')}
                                                    onBlur={() => setFieldTouched('confirmPassword', true)}
                                                />
                                                {/* {errorText('confirmPassword', touched, errors)} */}

                                                <View style={styles.termsContainer}>
                                                    <TouchableOpacity
                                                        style={styles.checkbox}
                                                        onPress={() =>
                                                            toggleTerms(values, setFieldValue, setFieldTouched)
                                                        }
                                                    >
                                                        <View
                                                            style={[
                                                                styles.checkboxBox,
                                                                values.agreedToTerms && styles.checkboxChecked,
                                                            ]}
                                                        >
                                                            {values.agreedToTerms && (
                                                                <Text style={styles.checkmark}>✓</Text>
                                                            )}
                                                        </View>
                                                    </TouchableOpacity>
                                                    <Text style={[styles.termsText, dynamicStyles.termsText]}>
                                                        By signing up, you agree to the{' '}
                                                        <Text style={styles.termsLink}>Terms of service</Text> and{' '}
                                                        <Text style={styles.termsLink}>Privacy policy.</Text>
                                                    </Text>
                                                </View>
                                                {/* {errorText('agreedToTerms', touched, errors)} */}
                                            </View>

                                            <View style={styles.bottomSection}>
                                                <View style={styles.buttonContainer}>
                                                    <CustomButton
                                                        onPress={handleSubmit}
                                                        title={'Sign Up'}
                                                        disabled={isSubmitting}
                                                    />
                                                </View>
                                                <View style={styles.signupLinkContainer}>
                                                    <Text style={[styles.signupText, dynamicStyles.signupText]}>
                                                        Already have an account?{' '}
                                                    </Text>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('login', { userType })}
                                                    >
                                                        <Text style={styles.signupLinkText}>Log In</Text>
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

export default SignUp;

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
    },
    backIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    backButton: {
        paddingVertical: vh(1),
    },
    backText: {
        fontSize: fs(14),
        fontFamily: FONTS.display_medium,
        color: colors.black,
    },
    textContainer: {
        marginTop: vh(2.2),
        marginBottom: vh(3.5),
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
    formContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: 8,
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: colors.black,
        fontSize: 14,
        fontFamily: FONTS.display_regular,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 20,
    },
    checkbox: {
        marginRight: 10,
        marginTop: 2,
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    checkboxChecked: {
        backgroundColor: colors.lightYellow,
        borderColor: colors.black,
    },
    checkmark: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    termsText: {
        flex: 1,
        fontSize: 12,
        fontFamily: FONTS.display_regular,
        color: colors.description,
        lineHeight: 15,
    },
    termsLink: {
        color: colors.primary[0],
        fontWeight: '700',
        fontFamily: FONTS.display_medium,
    },
    errorText: {
        color: colors.primary[0],
        fontSize: fs(12),
        marginTop: -4,
        marginBottom: 6,
        marginLeft: 4,
        fontFamily: FONTS.display_regular,
    },
    buttonContainer: {
        marginBottom: 22,
    },
    apiErrorText: {
        color: colors.primary[0],
        fontSize: fs(13),
        marginTop: -8,
        marginBottom: 14,
        fontFamily: FONTS.display_regular,
        textAlign: 'center',
    },
    bottomSection: {
        paddingBottom: 12,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#BEBEBE',
    },
    dividerText: {
        marginHorizontal: 18,
        fontSize: 14,
        color: '#7E7E7E',
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
        paddingHorizontal: 20,
        // marginTop: 5,
    },
    signupText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: FONTS.display_regular,
        color: colors.white,
    },
    signupLinkText: {
        fontSize: 14,
        fontFamily: FONTS.display_medium,
        color: colors.primary[0],
        fontWeight: '700',
    },
});
