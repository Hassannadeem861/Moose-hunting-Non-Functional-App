import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AuthScreenWrapper from '../../components/AuthScreenWrapper.jsx';
import { useNavigation, useTheme } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import { FONTS } from '../../utils/fonts.js';
import colors from '../../utils/color.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const PRIMARY = '#E01F00';

const PLANS = [
    { id: 'trial', label: '30 Day Free Trial', price: null },
    { id: 'standard', label: 'Standard Plan', price: '$9.99/month' },
    { id: 'premium', label: 'Premium Plan', price: '$19.99/month' },
];

const FEATURES = [
    'Lorem Ipsum dolor sit amet',
    'Lorem Ipsum dolor sit amet',
    'Lorem Ipsum dolor sit amet',
    'Lorem Ipsum dolor sit amet',
];

const ChoosePlan = ({ route }) => {
    const navigation = useNavigation();
    const { colors: themeColors } = useTheme();
    const [selectedPlan, setSelectedPlan] = useState('trial');

    // ── Dynamic Styles ──
    const dynamicStyles = StyleSheet.create({
        planLabel: {
            color: themeColors.text,
        },
        planLabelSelected: {
            color: PRIMARY,
        },
        planPrice: {
            color: themeColors.text === colors.white ? colors.textMuted : '#666',
        },
        featureText: {
            color: themeColors.text === colors.white ? colors.textMuted : '#333',
        },
        planRow: {
            borderColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.2)' : '#E8E8E8',
            backgroundColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.05)' : '#fff',
        },
        footer: {
            backgroundColor: themeColors.text === colors.white ? undefined : '#fff',
        },
    });

    return (
        <AuthScreenWrapper style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <CustomHeading
                    heading="Choose Your Plan"
                    paragraph="Select a plan to continue using the app"
                    center={true}
                    containerStyle={{ marginBottom: vh(3) }}
                />

                {/* Plan options */}
                <View style={styles.plansContainer}>
                    {PLANS.map((plan) => {
                        const isSelected = selectedPlan === plan.id;
                        return (
                            <TouchableOpacity
                                key={plan.id}
                                style={[styles.planRow, dynamicStyles.planRow, isSelected && styles.planRowSelected]}
                                onPress={() => setSelectedPlan(plan.id)}
                                activeOpacity={0.8}
                            >
                                {/* Radio */}
                                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>

                                <Text style={[styles.planLabel, dynamicStyles.planLabel, isSelected && styles.planLabelSelected]}>
                                    {plan.label}
                                </Text>

                                {plan.price && (
                                    <Text style={[styles.planPrice, dynamicStyles.planPrice]}>{plan.price}</Text>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Features */}
                <View style={styles.featuresContainer}>
                    {FEATURES.map((feat, i) => (
                        <View key={i} style={styles.featureRow}>
                            <Text style={styles.checkMark}>✓</Text>
                            <Text style={[styles.featureText, dynamicStyles.featureText]}>{feat}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ height: vh(12) }} />
            </ScrollView>

            <View style={[styles.footer, dynamicStyles.footer]}>
                <CustomButton
                    title="Subscribe Now"
                    onPress={() => {
                        // navigate to dashboard or next screen
                        navigation.navigate('secure_subscription');
                    }}
                />
            </View>
        </AuthScreenWrapper>
    );
};

export default ChoosePlan;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scroll: {
        paddingHorizontal: vw(6),
        paddingTop: vh(5),
    },
    plansContainer: {
        gap: vw(3),
        marginBottom: vh(3.5),
    },
    planRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        borderRadius: 14,
        paddingHorizontal: vw(4),
        paddingVertical: vh(2),
        backgroundColor: '#fff',
    },
    planRowSelected: {
        borderColor: PRIMARY,
        backgroundColor: '#FFF5F4',
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(3),
    },
    radioSelected: {
        borderColor: PRIMARY,
        backgroundColor: PRIMARY,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    planLabel: {
        flex: 1,
        fontSize: fs(15),
        fontFamily: FONTS.display_bold,
        fontWeight: '600',
        color: '#111',
    },
    planLabelSelected: {
        color: PRIMARY,
    },
    planPrice: {
        fontSize: fs(14),
        fontFamily: FONTS.display_regular,
        fontWeight: '500',
        color: '#555',
    },
    featuresContainer: {
        gap: vh(1.5),
        paddingLeft: vw(1),
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkMark: {
        fontSize: fs(16),
        color: PRIMARY,
        fontWeight: '700',
        width: 20,
    },
    featureText: {
        fontSize: fs(14),
        fontFamily: FONTS.display_regular,
        fontWeight: '400',
        color: '#333',
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: vw(5),
        paddingBottom: vh(4),
        paddingTop: vh(1),
        backgroundColor: '#fff',
    },
});
