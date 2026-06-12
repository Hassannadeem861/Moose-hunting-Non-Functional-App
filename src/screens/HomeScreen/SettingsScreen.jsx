import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../utils/color.js';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import CancelSubscriptionModal from '../../components/CancelSubscriptionModal/CancelSubscriptionModal.jsx';
import { Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { toggleTheme } from '../../redux/Slices/themeSlice.js';

// ── Assets ────────────────────────────────────────────────────────────────────
const dummyAvatar = require('../../assets/TechnicianSettingImages/dummyPicture.png');
const accountIcon = require('../../assets/TechnicianSettingImages/account.png');
const lockIcon = require('../../assets/TechnicianSettingImages/lock.png');
const subscriptionIcon = require('../../assets/TechnicianSettingImages/Subscription.png');
const termsIcon = require('../../assets/TechnicianSettingImages/Terms.png');
const privacyIcon = require('../../assets/TechnicianSettingImages/Privacy.png');
const logoutIcon = require('../../assets/TechnicianSettingImages/Logout.png');
const MyResume = require('../../assets/TechnicianSettingImages/my_resume.png');
const MyPost = require('../../assets/TechnicianSettingImages/post.png');
const arrowIcon = require('../../assets/TechnicianSettingImages/greater_then.png');

// ── Menu Items ────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { id: '1', label: 'Personal Information', icon: accountIcon, screen: 'personal_information' },
  // { id: '2', label: 'Tutorials & Coaching', icon: termsIcon, screen: 'tutorials_and_coaching_screen' },
  { id: '3', label: 'Mode', icon: termsIcon},
  { id: '4', label: 'Change Password', icon: lockIcon, screen: 'change_password' },
  { id: '5', label: 'Privacy Policy', icon: privacyIcon, screen: 'privacy_policy' },
  { id: '6', label: 'Terms & Conditions', icon: termsIcon, screen: 'terms_conditions' },
  { id: '7', label: 'Logout', icon: logoutIcon, isLogout: true },
  // { id: '8', label: 'Subscription',         icon: subscriptionIcon, isSubscription: true },
];

// ── Main Screen ───────────────────────────────────────────────────────────────
const SettingScreen = ({ navigation }) => {
  const { colors: themeColors, dark } = useTheme();
  const dispatch = useDispatch();
  
  const themeMode = useSelector((state) => state.theme.mode);
  
  console.log('dark =>', dark);

  const [subscriptionExpanded, setSubscriptionExpanded] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  // 'trial' = 30 Day Free Trial, 'paid' = any paid plan
  const [currentPlan, setCurrentPlan] = useState('trial');

  const profileName = 'John Doe';
  const profileEmail = 'johndoe@gmail.com';
  const profilePhotoUrl = null;
  const avatarSource = profilePhotoUrl ? { uri: profilePhotoUrl } : dummyAvatar;

  // ── Dynamic Styles ──
  const dynamicStyles = StyleSheet.create({
    title: {
      color: themeColors.text,
    },
    name: {
      color: themeColors.text,
      // backgroundColor: dark ? ['#FFDF00', '#F6D108', '#EDC211', '#E3B419', '#DAA521'] : ['#F9D084', '#F0C76F'],

    },
    email: {
      color: themeMode === 'dark' ? colors.textHint : colors.description,
    },
    rowLabel: {
      color: themeColors.text,
    },
    menuIcon: {
      tintColor: themeMode === 'dark' ? colors.primary[0] : colors.black,
    },
    arrowIcon: {
      tintColor: themeMode === 'dark' ? colors.primary[0] : colors.black,
    },
    separator: {
      backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : '#f0f0f0',
    },
    subBtn: {
      backgroundColor: themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : '#fff',
    },
    subBtnText: {
      color: themeMode === 'dark' ? colors.primary[0] : colors.primary[0],
    },
    switchTrack: {
      backgroundColor: dark ? 'rgba(255,255,255,0.18)' : '#E5E7EB',
      borderColor: dark ? 'rgba(255,255,255,0.14)' : '#D1D5DB',
    },
    switchThumb: {
      backgroundColor: dark ? colors.primary[0] : '#FFFFFF',
      shadowColor: '#000',
      shadowOpacity: dark ? 0.18 : 0.12,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },

    bannerText: {
      color: dark ? '#2D2D2D' : '#2D2D2D',
    },
  });

  const performLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: 'splash_screen' }] });
  };

  const handleCancelConfirm = () => {
    setCancelModalVisible(false);
    Alert.alert('Cancelled', 'Your subscription has been cancelled.');
  };

  const handlePress = (item) => {
    if (item.isLogout) {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: performLogout },
      ]);
    } else if (item.isSubscription) {
      // Toggle subscription sub-menu
      setSubscriptionExpanded((prev) => !prev);
    } else if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <>
      <SettingsScreenWrapper >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

          {/* ── Title ── */}
          {/* <Text style={styles.title}>Settings</Text> */}
          <Text
            style={[
              styles.title,
              dynamicStyles.title,
            ]}
          >
            Settings
          </Text>

          {/* ── Profile Card ── */}
          <View style={styles.profileWrap}>
            <Image source={avatarSource} style={styles.avatar} />
            {/* <Text style={styles.name}>{profileName}</Text> */}
            <Text
              style={[
                styles.name,
                dynamicStyles.name,
              ]}
            >
              {profileName}
            </Text>
            
            {/* <Text
              style={[
                styles.email,
                dynamicStyles.email,
              ]}
            >
              {profileEmail}
            </Text> */}
          </View>

          {/* ── Banner ── */}
          <LinearGradient
            colors={dark ? ['#FFDF00', '#F6D108', '#EDC211', '#E3B419', '#DAA521'] : ['#F9D084', '#F0C76F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bannerGradient}
          >
            <TouchableOpacity
              style={styles.banner}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('personal_information')}
            >
              <Text style={[styles.bannerText, dynamicStyles.bannerText]}>Profile Page</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* ── Menu Items ── */}
          <View style={styles.menuWrap}>
            {MENU_ITEMS.map((item, idx) => (
              <View key={item.id}>

                {/* ── Main Row ── */}
                <TouchableOpacity
                  style={styles.row}
                  activeOpacity={0.6}
                  onPress={() => handlePress(item)}
                >
                  <View style={styles.iconWrap}>
                    <Image source={item.icon} style={[styles.menuIcon, dynamicStyles.menuIcon]} />
                  </View>
                  <Text style={[styles.rowLabel, dynamicStyles.rowLabel]}>{item.label}</Text>
                  {/* {!item.isLogout && (
                  <Image
                    source={arrowIcon}
                    style={[
                      styles.menuIcon,
                      item.isSubscription && subscriptionExpanded && styles.arrowDown,
                    ]}
                  />
                )} */}

                  {item.label === 'Mode' ? (
                    <Switch
                      value={themeMode === 'dark'}
                      trackColor={{ false: dark ? 'rgba(255,255,255,0.18)' : '#E5E7EB', true: colors.primary[0] }}
                      thumbColor={dark ? colors.primary[0] : '#FFFFFF'}
                      ios_backgroundColor={dark ? 'rgba(255,255,255,0.18)' : '#E5E7EB'}
                      style={styles.switchStyle}
                      onValueChange={() => {
                        dispatch(toggleTheme());
                      }}
                    />
                  ) : (
                    !item.isLogout && (
                      <Image
                        source={arrowIcon}
                        style={[styles.menuIcon, dynamicStyles.arrowIcon]}
                      />
                    )
                  )}
                </TouchableOpacity>

                {/* ── Subscription Sub-menu ── */}
                {item.isSubscription && subscriptionExpanded && (
                  <View style={styles.subMenu}>

                    {/* Change Plan — only for paid plan */}
                    {currentPlan !== 'trial' && (
                      <TouchableOpacity
                        style={[styles.subBtn, dynamicStyles.subBtn]}
                        activeOpacity={0.7}
                        onPress={() => {
                          setSubscriptionExpanded(false);
                          navigation.navigate('choose_plan');
                        }}
                      >
                        <Text style={[styles.subBtnText, dynamicStyles.subBtnText]}>Change Plan</Text>
                      </TouchableOpacity>
                    )}

                    {/* Cancel Subscription — always visible */}
                    <TouchableOpacity
                      style={[styles.subBtn, styles.subBtnCancel, dynamicStyles.subBtn]}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSubscriptionExpanded(false);
                        setCancelModalVisible(true);
                      }}
                    >
                      <Text style={[styles.subBtnText, styles.subBtnCancelText]}>Cancel Subscription</Text>
                    </TouchableOpacity>

                  </View>
                )}

                {idx < MENU_ITEMS.length - 1 && <View style={[styles.separator, dynamicStyles.separator]} />}
              </View>
            ))}

            {/* Delete Account */}
            <CustomButton
              style={{ marginTop: 30 }}
              title="Delete Account"
              onPress={performLogout}
            />
          </View>

        </ScrollView>
      </SettingsScreenWrapper>

      {/* ── Cancel Subscription Modal ── */}
      <CancelSubscriptionModal
        visible={cancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        onConfirm={handleCancelConfirm}
      />
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 100 },

  title: {
    fontSize: 24,
    fontFamily: FONTS.display_bold,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  // Profile
  profileWrap: { alignItems: 'center', marginBottom: 28 },
  avatar: { width: 110, height: 110, borderRadius: 60, backgroundColor: '#eee', marginBottom: 12 },
  name: { fontSize: 20, fontFamily: FONTS.display_bold, marginBottom: 2 },
  email: { fontSize: 14, fontFamily: FONTS.display_regular, color: colors.description },

  // Banner
  bannerGradient: {
    // borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 8,
  },
  banner: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bannerText: { fontSize: 17, fontFamily: FONTS.display_bold, color: '#2D2D2D' },

  // Menu
  menuWrap: { paddingHorizontal: 20, paddingTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  iconWrap: { width: 36, alignItems: 'center', marginRight: 14 },
  switchStyle: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  menuIcon: { width: 15, height: 15, resizeMode: 'contain', tintColor: colors.primary[0] },
  arrowDown: { transform: [{ rotate: '90deg' }] },
  rowLabel: { flex: 1, fontSize: 15, fontFamily: FONTS.display_regular },
  separator: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 50 },

  // Subscription Sub-menu
  subMenu: {
    flexDirection: 'row',
    gap: vw(3),
    paddingLeft: 50,
    paddingBottom: vh(1.5),
    paddingTop: vh(0.5),
  },
  subBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.primary[0],
    borderRadius: 10,
    paddingVertical: vh(1.2),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subBtnCancel: {
    backgroundColor: colors.primary[0],
  },
  subBtnText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_medium,
    color: colors.primary[0],
  },
  subBtnCancelText: {
    color: '#fff',
  },
});