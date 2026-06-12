import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
// import {useDispatch, useSelector} from 'react-redux';
import colors from '../../utils/color.js';
import {FONTS} from '../../utils/fonts.js';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import {ICON} from '../../utils/authImages.js';
// import {getValidationSchema} from '../../../utils/validationSchema.js';
// import {
//   changePasswordAsync,
// } from '../../../redux/Services/authService.js';
// import {asyncStatus} from '../../../utils/asyncStatus.js';
// import {setChangePasswordStatus} from '../../../redux/Slices/authSlice.js';

const ClientChangePasswordScreen = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  // const dispatch = useDispatch();

  const [hasSubmittedChangePassword, setHasSubmittedChangePassword] = useState(false);

  // ── Dynamic Styles ──
  // Theme ke base par styles update hoti hain
  const dynamicStyles = StyleSheet.create({
    fieldLabel: {
      color: themeColors.text,
    },
  });

  const handleSafeBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('ClientSettingScreen');
  };

  // const {change_password_status, change_password_error} = useSelector(
  //   state => state?.auth || {},
  // );

  // const isLoading = change_password_status === asyncStatus.LOADING;

  const errorText = (fieldName, touched, errors) => {
    if (!touched[fieldName] || !errors[fieldName]) {
      return null;
    }

    return <Text style={styles.errorText}>{errors[fieldName]}</Text>;
  };

  // const handleSave = async (values, {setSubmitting}) => {
  //   console.log('[ClientChangePassword] Save clicked');
  //   console.log('[ClientChangePassword] Form values:', values);

  //   const payload = {
  //     currentPassword: values.currentPassword,
  //     newPassword: values.newPassword,
  //     confirmPassword: values.confirmPassword,
  //   };

  //   console.log('[ClientChangePassword] Dispatching changePasswordAsync');

  //   dispatch(setChangePasswordStatus());
  //   setHasSubmittedChangePassword(true);
  //   try {
  //     await dispatch(changePasswordAsync(payload));
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log('[ClientChangePassword] Status changed:', change_password_status);

  //   if (change_password_status === asyncStatus.SUCCEEDED && hasSubmittedChangePassword) {
  //     console.log('[ClientChangePassword] API success');
  //     dispatch(setChangePasswordStatus());
  //     setHasSubmittedChangePassword(false);
  //     Alert.alert('Success', 'Password changed successfully.', [
  //       {text: 'OK', onPress: handleSafeBack},
  //     ]);
  //   }
  // }, [change_password_status, hasSubmittedChangePassword, dispatch]);

  // useEffect(() => {
  //   if (
  //     change_password_status === asyncStatus.ERROR &&
  //     change_password_error &&
  //     hasSubmittedChangePassword
  //   ) {
  //     console.log('[ClientChangePassword] API failed:', change_password_error);
  //     dispatch(setChangePasswordStatus());
  //     setHasSubmittedChangePassword(false);
  //     Alert.alert('Update Failed', change_password_error);
  //   }
  // }, [
  //   change_password_status,
  //   change_password_error,
  //   hasSubmittedChangePassword,
  //   dispatch,
  // ]);

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headerContainer}>
                <MainHeader onBackPress={handleSafeBack} />
              </View>

              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                }}
                // validationSchema={getValidationSchema('change-password')}
                // onSubmit={handleSave}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  setFieldTouched,
                  // handleSubmit,
                  isSubmitting,
                }) => (
                  <View style={styles.contentContainer}>
                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Current Password</Text>
                    <CustomInput
                      placeholder="••••••••"
                      value={values.currentPassword}
                      onChangeText={handleChange('currentPassword')}
                      onBlur={() => setFieldTouched('currentPassword', true)}
                      islabelshown={false}
                      isPassword={true}
                      image={ICON.PASSWORD}
                    />
                    {errorText('currentPassword', touched, errors)}

                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>New Password</Text>
                    <CustomInput
                      placeholder="••••••••"
                      value={values.newPassword}
                      onChangeText={handleChange('newPassword')}
                      onBlur={() => setFieldTouched('newPassword', true)}
                      islabelshown={false}
                      isPassword={true}
                      image={ICON.PASSWORD}
                    />
                    {errorText('newPassword', touched, errors)}

                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Confirm Password</Text>
                    <CustomInput
                      placeholder="••••••••"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={() => setFieldTouched('confirmPassword', true)}
                      islabelshown={false}
                      isPassword={true}
                      image={ICON.PASSWORD}
                    />
                    {errorText('confirmPassword', touched, errors)}

                    <View style={styles.bottomButtonContainer}>
                      <CustomButton
                        title={'Save Changes'}
                        // title={isLoading ? 'Saving Changes...' : 'Save Changes'}
                        // onPress={handleSubmit}
                        // backgroundColor={colors.primary}
                        // disabled={isSubmitting || isLoading}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      </SettingsScreenWrapper>
  );
};

export default ClientChangePasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: FONTS.display_medium,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: -4,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 6,
    marginLeft: 4,
    fontFamily: FONTS.display_regular,
  },
  bottomButtonContainer: {
    marginTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    paddingTop: 10,
    // backgroundColor: colors.white,
  },
});
