import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import { Formik, FieldArray } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';

import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import { fs, vh, vw } from '../../utils/responsive';
import { DUMMY_PROFILE } from '../../utils/dummyProfileData.js';

// ── Assets ─────────────────────────────────────────────────────────────────────
const ICON_CROSS = require('../../assets/technicianProfileImages/crossIcon.png');
const ICON_EDIT = require('../../assets/technicianProfileImages/editIcon.png');
const DUMMY_AVATAR = require('../../assets/technicianProfileImages/dummyPicture.png');




// ── Main Screen ────────────────────────────────────────────────────────────────
const TechnicianProfileEditPersonalInformationScreen = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();

  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(DUMMY_PROFILE.profilePhotoUrl || null);

  // ── Dynamic Styles ──
  // Theme ke base par styles update hoti hain
  const dynamicStyles = StyleSheet.create({
    name: {
      color: themeColors.text,
    },
    email: {
      color: themeColors.text,
    },
    labelText: {
      color: themeColors.text,
    },
    fieldLabel: {
      color: themeColors.text,
    },
  });

  // ── Image picker ─────────────────────────────────────────────────────────────
  const handleImagePick = () => {
    Alert.alert('Profile Photo', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () =>
          ImagePicker.openCamera({ width: 400, height: 400, cropping: true, cropperCircleOverlay: true })
            .then((img) => setProfileImage(img.path))
            .catch(() => { }),
      },
      {
        text: 'Gallery',
        onPress: () =>
          ImagePicker.openPicker({ width: 400, height: 400, cropping: true, cropperCircleOverlay: true })
            .then((img) => setProfileImage(img.path))
            .catch(() => { }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = (values) => {
    if (!editMode) {
      // "Edit Profile" button dabaya — edit mode ON
      setEditMode(true);
    } else {
      // "Save" button dabaya — save karo aur edit mode OFF
      console.log('Saved values:', { ...values, profileImage });
      setEditMode(false);
      // Yahan API call lagana
    }
  };

  // ── Avatar source ─────────────────────────────────────────────────────────
  const avatarSource = profileImage ? { uri: profileImage } : DUMMY_AVATAR;

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.mainContainer}>

            <MainHeader onBackPress={() => navigation.goBack()} />

            {/* ── Profile Avatar ── */}
            <View style={styles.profileWrap}>
              <View style={styles.avatarWrap}>
                <Image source={avatarSource} style={styles.avatar} />

                {/* Edit icon — sirf editMode mein dikhega */}
                {editMode && (
                  <TouchableOpacity style={styles.editIconWrap} onPress={handleImagePick} activeOpacity={0.8}>
                    <Image source={ICON_EDIT} style={styles.editIcon} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* ── Formik Form ── */}
            <Formik
              initialValues={{ ...DUMMY_PROFILE }}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({
                values,
                handleChange,
                touched,
                errors,
                setFieldValue,
                setFieldTouched,
                handleSubmit: formikSubmit,
              }) => (
                <View style={styles.formContainer}>

                  {/* ── Basic Info ─────────────────────────── */}
                  <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Name</Text>
                  <CustomInput
                    placeholder="Your Full Name"
                    value={values.fullName}
                    onChangeText={handleChange('fullName')}
                    onBlur={() => setFieldTouched('fullName', true)}
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />
                  <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Email</Text>
                  <CustomInput
                    placeholder="Enter Your Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email', true)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />
                  <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Phone</Text>
                  <CustomInput
                    placeholder="Enter Your Phone"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone', true)}
                    keyboardType="phone-pad"
                    islabelshown={false}
                    disabled={!editMode}
                    style={!editMode && styles.readonlyInput}
                  />


                  {/* ── Button ─────────────────────────────── */}
                  <View style={styles.buttonContainer}>
                    <CustomButton
                      onPress={() => handleSubmit(values)}
                      title={editMode ? 'Save Profile' : 'Edit'}
                    />
                  </View>

                </View>
              )}
            </Formik>

          </View>
        </ScrollView>

      </KeyboardAvoidingView>
    </SettingsScreenWrapper>
  );
};

export default TechnicianProfileEditPersonalInformationScreen;

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: FONTS.display_medium,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: -4,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: vw(5),
    paddingBottom: vh(5),
  },
  // Profile avatar section
  profileWrap: {
    alignItems: 'center',
    marginBottom: vh(3),
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 18,
    backgroundColor: '#eee',
  },
  editIconWrap: {
    position: 'absolute',
    top: -10,
    right: -6,
    // backgroundColor: '#E01F00',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  editIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    // tintColor: colors.lightYellow,
  },
  profileName: {
    fontSize: fs(17),
    fontFamily: FONTS.display_medium,
    color: colors.black,
  },
  profileEmail: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    color: '#888',
    marginTop: 3,
  },
  formContainer: {
    flex: 1,
  },
  sectionHeading: {
    marginTop: vh(2),
    marginBottom: vh(0.5),
  },
  // Read-only style
  readonlyInput: {
    // backgroundColor: 'red',
    color: '#555',
  },
  // Dropdown
  dropdownBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: vw(4),
    paddingVertical: Platform.OS === 'ios' ? 18 : 14,
    marginVertical: 10,
  },
  disabledBox: {
    // backgroundColor: '#F5F5F5',
  },
  dropdownValue: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: colors.black,
  },
  dropdownPlaceholder: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#AAA',
  },
  dropdownIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  // Location row
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: vw(3.5),
  },
  // Date row
  dateRow: {
    flexDirection: 'row',
    gap: vw(2),
  },
  dateHalf: {
    flex: 1,
  },
  dateInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 15,
    paddingHorizontal: vw(3),
    paddingVertical: Platform.OS === 'ios' ? 18 : 13,
    marginVertical: 10,
  },
  dateInputValue: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: colors.black,
  },
  dateInputPlaceholder: {
    flex: 1,
    fontSize: fs(14),
    fontFamily: FONTS.display_regular,
    color: '#AAA',
  },
  calendarIconSmall: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#AAA',
  },
  // Calendar overlay
  calendarOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  calendarBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  // Add More
  addMoreWrap: {
    alignItems: 'flex-end',
    marginBottom: vh(1),
  },
  addMoreBtn: {
    borderRadius: 10,
    paddingHorizontal: vw(4),
    paddingVertical: 7,
  },
  addMoreText: {
    color: colors.white,
    fontSize: fs(13),
    fontWeight: '600',
  },
  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: vh(1.5),
    marginTop: vh(0.5),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: vw(3),
    paddingVertical: 5,
    gap: 6,
  },
  tagText: {
    color: colors.white,
    fontFamily: FONTS.display_medium,
    fontSize: fs(13),
  },
  tagCross: {
    marginTop: -18,
    marginRight: -13,
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  // Button
  buttonContainer: {
    marginTop: vh(3),
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: vw(5),
  },
  modalBox: {
    backgroundColor: colors.white,
    borderRadius: 12,
    maxHeight: vh(50),
    overflow: 'hidden',
  },
  modalItem: {
    paddingVertical: vh(1.8),
    paddingHorizontal: vw(5),
  },
  modalItemSelected: {
    backgroundColor: '#FFECEC',
  },
  modalItemText: {
    fontSize: fs(15),
    fontFamily: FONTS.display_regular,
    color: colors.black,
  },
  modalItemTextSelected: {
    color: colors.primary,
    fontFamily: FONTS.display_medium,
  },
  // Error
  errorText: {
    color: colors.primary,
    fontSize: fs(12),
    marginTop: -6,
    marginBottom: 4,
    marginLeft: 4,
  },
});
