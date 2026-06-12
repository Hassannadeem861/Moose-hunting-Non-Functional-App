import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
// import AppModal from '../../../components/Modals/AppModal.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';

const PLANS = [{ id: 'first_month', label: 'First Month', price: '$15.99' }];

const FEATURES = [
  { title: 'Verified Community:', desc: 'Access a trusted network of real estate professionals and clients.' },
  { title: 'Secure Messaging:',   desc: 'Communicate safely with your matched agent.' },
  { title: 'Access to Listings:', desc: 'Browse real estate listings tailored to your preferences.' },
];

const ClientSubscriptionScreen = () => {
  const { colors: themeColors } = useTheme();
  const [selectedPlan, setSelectedPlan]   = useState('first_month');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const dynamicStyles = StyleSheet.create({
    title: {
      color: themeColors.text,
    },
    planLabel: {
      color: themeColors.text,
    },
    featureText: {
      color: themeColors.text,
    },
    featureBold: {
      color: themeColors.text,
    },
  });

  const confirmCancel = () => {
    setShowCancelModal(false);
    // TODO: API call to cancel subscription
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <MainHeader />
      </View>

      <View style={styles.container}>
        <Text style={[styles.title, dynamicStyles.title]}>Join the Trusted Community</Text>
        <Text style={styles.subtitle}>
          To ensure safety and trust, all members must have an active
          subscription. Choose your plan below to get started with full access to
          our features.
        </Text>

        {/* Plan cards */}
        <View style={styles.plansContainer}>
          {PLANS.map(plan => {
            const isSelected = selectedPlan === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, isSelected && styles.planCardSelected]}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkCircle, isSelected && styles.checkCircleSelected]}>
                  {isSelected && <Icon name="check" size={13} color="#fff" />}
                </View>
                <Text style={[styles.planLabel, dynamicStyles.planLabel]}>{plan.label}</Text>
                <Text style={[styles.planPrice, isSelected && styles.planPriceSelected]}>
                  {plan.price}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Icon name="check" size={16} color="#22c55e" style={styles.featureCheck} />
              <Text style={[styles.featureText, dynamicStyles.featureText]}>
                <Text style={[styles.featureBold, dynamicStyles.featureBold]}>{f.title}</Text> {f.desc}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <CustomButton
          title="Cancel Subscription"
          onPress={() => setShowCancelModal(true)}
          backgroundColor={colors.primary}
        />
      </View>
{/* 
      <AppModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Are you sure you want to cancel your Subscription?"
        confirmText="Yes Cancel Subscription"
        onConfirm={confirmCancel}
      /> */}
    </SafeAreaView>
  );
};

export default ClientSubscriptionScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.white },
  headerContainer: { paddingHorizontal: 16, paddingTop: 4 },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 10, paddingBottom: 120 },
  title: {
    fontSize: 28,
    fontFamily: FONTS.display_bold,
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: FONTS.display_regular,
    color: colors.description,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  plansContainer: { marginBottom: 32 },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  planCardSelected: { borderColor: '#d0d0d0' },
  checkCircle: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 1.5, borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 14,
  },
  checkCircleSelected: { backgroundColor: colors.parrot, borderColor: colors.parrot },
  planLabel: { flex: 1, fontSize: 16, fontFamily: FONTS.display_regular },
  planPrice: { fontSize: 16, fontFamily: FONTS.display_bold, color: colors.description },
  planPriceSelected: { color: colors.parrot },
  featuresContainer: { gap: 20 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start' },
  featureCheck: { marginTop: 2, marginRight: 12 },
  featureText: { flex: 1, fontSize: 15, fontFamily: FONTS.display_regular, lineHeight: 22 },
  featureBold: { fontFamily: FONTS.display_bold },
  bottomButtonContainer: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    paddingTop: 10,
    backgroundColor: colors.white,
  },
});
