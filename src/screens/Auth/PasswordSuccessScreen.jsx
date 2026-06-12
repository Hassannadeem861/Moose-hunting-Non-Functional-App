import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import colors from '../../utils/color.js';
import SuccessImage from '../../assets/membership.png';

const MemberShipActivated = ({ route }) => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  const { userType } = route?.params || {};

  // ── Dynamic Styles ──
  const dynamicStyles = StyleSheet.create({
    title: {
      color: themeColors.text,
    },
    subtitle: {
      color: themeColors.text === colors.white ? colors.textHint : colors.description,
    },
  });

  const handleContinue = () => {
    // Navigate to home screen as technician
    navigation.navigate('login', {
    //   userType: userType || 'technician',
    });
  };

  return (
    <AuthScreenWrapper style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={SuccessImage} style={styles.successImage} />
        <Text style={[styles.title, dynamicStyles.title]}>Your Password Has Been Reset Successfully</Text>
        <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis..</Text>
      </View>

      <View style={styles.bottomButtonContainer}>
        <CustomButton
          title="Log In"
          onPress={handleContinue}
          // backgroundColor={colors.primary}
        />
      </View>
    </AuthScreenWrapper>
  );
};

export default MemberShipActivated;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  successImage: {
    width: 130,
    height: 130,
    marginBottom: 28,
    resizeMode: 'contain',
    // backgroundColor:"red"
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: colors.description,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    paddingTop: 10,
    // backgroundColor: colors.white,
  },
});
