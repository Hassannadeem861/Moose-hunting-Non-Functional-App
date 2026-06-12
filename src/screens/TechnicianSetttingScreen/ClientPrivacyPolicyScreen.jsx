import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';

const ClientPrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    mainTitle: {
      color: themeColors.text,
    },
    heading: {
      color: themeColors.text,
    },
  });

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <MainHeader />
        </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>Privacy Policy</Text>

        <Text style={[styles.heading, dynamicStyles.heading]}>1. Acceptance of Terms</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={[styles.heading, dynamicStyles.heading]}>2. Use of the Service</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={[styles.heading, dynamicStyles.heading]}>3. Privacy Policy</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>

        <Text style={[styles.heading, dynamicStyles.heading]}>4. Termination</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Egestas dignissim nulla
          pellentesque sit nibh. Venenatis nunc etiam libero ultricies accumsan
          sed lectus. At tortor accumsan at commodo non.
        </Text>
      </ScrollView>
      </SettingsScreenWrapper>
  );
};

export default ClientPrivacyPolicyScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  headerContainer: { paddingHorizontal: 16, paddingTop: 4 },
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  mainTitle: {
    fontSize: 28,
    fontFamily: FONTS.display_bold,
    marginBottom: 16,
  },
  heading: {
    fontSize: 16,
    fontFamily: FONTS.display_bold,
    marginTop: 14,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    fontFamily: FONTS.display_regular,
    color: colors.description,
    lineHeight: 22,
    marginBottom: 13,
  },
});
