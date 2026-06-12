import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
  Image
} from 'react-native';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import { useNavigation, useTheme } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { getValidationSchema } from '../../utils/validationSchema.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';

// ─── Helpers ────────────────────────────────────────────────────────────────

const formatCardNumber = raw =>
  raw.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

const formatExpiry = raw => {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

// ─── Component ───────────────────────────────────────────────────────────────

const SecureSubscription = ({ route }) => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  const { userType } = route?.params || {};

  // ── Dynamic Styles ──
  const dynamicStyles = StyleSheet.create({
    fieldLabel: {
      color: themeColors.text,
    },
    secureBadgeText: {
      color: themeColors.text,
    },
  });

  const handlePay = async (values, { setSubmitting }) => {
    try {
      navigation.navigate('membership_activated', { userType });
    } catch (err) {
      Alert.alert('Payment Failed', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthScreenWrapper style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.backButtoncontainer}>
              <MainHeader onBackPress={() => navigation.goBack()} />
            </View>

            <View style={styles.container}>
              <CustomHeading
                containerStyle={styles.headingContainer}
                heading="Enter Card Details"
                paragraph="Enter your card details."
                color={themeColors.text}
                paragraphColor={themeColors.text === colors.white ? colors.textHint : colors.description}
                headingFontSize={28}
                paragraphFontSize={14}
                headingFontFamily={FONTS.display_medium}
                paragraphFontamily={FONTS.display_regular}
              />

              <Formik
                initialValues={{ cardHolder: '', cardNumber: '', expiry: '', cvv: '' }}
                // validationSchema={getValidationSchema('payment')}
                onSubmit={handlePay}
              >
                {({ values, errors, touched, handleChange, setFieldValue, setFieldTouched, handleSubmit, isSubmitting }) => (
                  <View>
                    {/* Card Holder Name */}
                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Card Holder Name</Text>
                    <CustomInput
                      islabelshown={false}
                      placeholder="Name"
                      value={values.cardHolder}
                      onChangeText={handleChange('cardHolder')}
                      onBlur={() => setFieldTouched('cardHolder', true)}
                    />
                    {touched.cardHolder && errors.cardHolder && (
                      <Text style={styles.errorText}>{errors.cardHolder}</Text>
                    )}

                    {/* Card Number */}
                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Card Number</Text>
                    <CustomInput
                      islabelshown={false}
                      placeholder="Card Number"
                      value={values.cardNumber}
                      keyboardType="number-pad"
                      maxLength={19}
                      onChangeText={text =>
                        setFieldValue('cardNumber', formatCardNumber(text))
                      }
                      onBlur={() => setFieldTouched('cardNumber', true)}
                    />
                    {touched.cardNumber && errors.cardNumber && (
                      <Text style={styles.errorText}>{errors.cardNumber}</Text>
                    )}

                    {/* Expiry + CVV row */}
                    <View style={styles.row}>
                      <View style={styles.halfField}>
                        <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Expiry Date</Text>
                        <CustomInput
                          islabelshown={false}
                          placeholder="MM/YY"
                          value={values.expiry}
                          keyboardType="number-pad"
                          maxLength={5}
                          onChangeText={text =>
                            setFieldValue('expiry', formatExpiry(text))
                          }
                          onBlur={() => setFieldTouched('expiry', true)}
                        />
                        {touched.expiry && errors.expiry && (
                          <Text style={styles.errorText}>{errors.expiry}</Text>
                        )}
                      </View>

                      <View style={styles.rowSpacer} />

                      <View style={styles.halfField}>
                        <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>CVV</Text>
                        <CustomInput
                          islabelshown={false}
                          placeholder="CVV"
                          value={values.cvv}
                          keyboardType="number-pad"
                          maxLength={4}
                          isPassword={true}
                          onChangeText={text =>
                            setFieldValue('cvv', text.replace(/\D/g, '').slice(0, 4))
                          }
                          onBlur={() => setFieldTouched('cvv', true)}
                        />
                        {touched.cvv && errors.cvv && (
                          <Text style={styles.errorText}>{errors.cvv}</Text>
                        )}
                      </View>
                    </View>

                    {/* Security badge */}
                    <View style={styles.secureBadge}>
                      {/* <Icon name="lock" size={16} color={colors.parrot} /> */}
                      <Image source={require('../../assets/baseline-lock.png')} style={{ width: 16, height: 16, tintColor: colors.lightYellow }} />
                      <Text style={[styles.secureBadgeText, dynamicStyles.secureBadgeText]}>
                        Your payment is encrypted and secure.
                      </Text>
                    </View>

                    {/* Submit */}
                    <View style={styles.bottomButtonContainer}>
                      <CustomButton
                        onPress={handleSubmit}
                        title={isSubmitting ? 'Processing...' : 'Pay Now'}
                        disabled={isSubmitting}
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

export default SecureSubscription;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  backButtoncontainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  headingContainer: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.white,
    marginBottom: 2,
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#E01F00',
    marginTop: -6,
    marginBottom: 4,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  halfField: {
    flex: 1,
  },
  rowSpacer: {
    width: 14,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  secureBadgeText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.white,
  },
  bottomButtonContainer: {
    marginTop: 8,
  },
});
