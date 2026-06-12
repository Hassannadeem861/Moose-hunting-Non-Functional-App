import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import colors from '../../utils/color.js';
import { useNavigation, useTheme } from '@react-navigation/native';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';

const PLANS = [{ id: 'first_month', label: 'One Time Payment', price: '$53.99' }];

const FEATURES = [
    {
        // title: 'Verified Community:',
        desc: 'Unlimited use of bull, cow, calf, and environmental calls.',
    },
    {
        // title: 'Secure Messaging:',
        desc: 'Guided training experience with audio playback and waveform visualization.',
    },
    {
        // title: 'Access to Listings:',
        desc: 'Create or join hunting groups, share locations, and communicate with fellow hunters.',
    },
    {
        // title: 'Access to Listings:',
        desc: 'Create or join hunting groups, share locations, and communicate with fellow hunters.',
    },
    {
        // title: 'Access to Listings:',
        desc: 'Save your favorite hunting spots, moose sightings, and track your hunt progress.',
    },
    {
        // title: 'Access to Listings:',
        desc: 'Access William Archibald’s professional moose calling tutorials and coaching catalog.',
    },
];

const JoinTrustedCommunity = ({ route }) => {
    const navigation = useNavigation();
    const { colors: themeColors } = useTheme();
    const { userType } = route?.params || {};

    const [selectedPlan, setSelectedPlan] = useState('first_month');

    // ── Dynamic Styles ──
    const dynamicStyles = StyleSheet.create({
        title: {
            color: themeColors.text,
        },
        subtitle: {
            color: themeColors.text === colors.white ? colors.textHint : colors.description,
        },
        planLabel: {
            color: themeColors.text,
        },
        planCard: {
            backgroundColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.08)' : '#3D4515',
            borderColor: themeColors.text === colors.white ? colors.lightYellow : colors.lightYellow,
        },
        featureText: {
            color: themeColors.text,
        },
        bullet: {
            color: themeColors.text,
        },
    });

    const handleContinue = () => {
        // navigate to payment screen
        navigation.navigate('secure_subscription', { userType, plan: selectedPlan });
    };

    return (
        <AuthScreenWrapper style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header text */}
                <Text style={[styles.title, dynamicStyles.title]}>Unlock Lifetime Access to Moose Calling 101</Text>
                <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                    One-time payment for full access to the entire app, including moose call library, practice mode, GPS tracking, and more!
                </Text>

                {/* Plan cards */}
                <View style={styles.plansContainer}>
                    {PLANS.map(plan => {
                        const isSelected = selectedPlan === plan.id;
                        return (
                            <TouchableOpacity
                                key={plan.id}
                                style={[styles.planCard, dynamicStyles.planCard, isSelected && styles.planCardSelected]}
                                onPress={() => setSelectedPlan(plan.id)}
                                activeOpacity={0.8}
                            >
                                {/* Left: check circle */}
                                <View
                                // style={[
                                //     styles.checkCircle,
                                //     isSelected && styles.checkCircleSelected,
                                // ]}
                                >
                                    {/* {isSelected && <Icon name="check" size={13} color="#fff" />} */}
                                </View>

                                <Text style={[styles.planLabel, dynamicStyles.planLabel]}>{plan.label}</Text>

                                <Text
                                    style={[
                                        styles.planPrice,
                                        isSelected && styles.planPriceSelected,
                                    ]}
                                >
                                    {plan.price}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Feature list */}
                <View style={styles.featuresContainer}>
                    {FEATURES.map((f, i) => (
                        <View key={i} style={styles.featureRow}>
                            <Text style={[styles.bullet, dynamicStyles.bullet]}>•</Text>

                            <Text style={[styles.featureText, dynamicStyles.featureText]}>
                                {f.desc}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Pinned button */}
            <View style={styles.bottomButtonContainer}>
                <CustomButton
                    onPress={handleContinue}
                    title="Continue To Payment"
                //   backgroundColor={colors.primary}
                />
            </View>
        </AuthScreenWrapper>
    );
};

export default JoinTrustedCommunity;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 32,
        paddingBottom: 120,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: colors.white,
        textAlign: 'center',
        marginBottom: 14,
        lineHeight: 40,
    },
    subtitle: {
        fontSize: 15,
        color: colors.description,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    plansContainer: {
        marginBottom: 32,
    },
    planCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colors.lightYellow,
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#3D4515',
    },
    planCardSelected: {
        borderColor: colors.lightYellow,
    },
    checkCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1.5,
        borderColor: colors.lightYellow,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    checkCircleSelected: {
        backgroundColor: colors.parrot,
        borderColor: colors.parrot,
    },
    planLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: colors.white,
    },
    planPrice: {
        fontSize: 16,
        fontWeight: '600',
         color: colors.white,
    },
    planPriceSelected: {
        color: colors.white,
    },
    featuresContainer: {
        gap: 20,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    featureCheck: {
        marginTop: 2,
        marginRight: 12,
    },
    featureText: {
        flex: 1,
        fontSize: 15,
        color: colors.white,
        lineHeight: 22,
    },
    featureBold: {
        fontWeight: '700',
        color: colors.white,
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

    bullet: {
        color: colors.white,
        fontSize: 20,
        marginRight: 10,
        lineHeight: 22,
        fontWeight: 'bold',
    },
});
