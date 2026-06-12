import React, { useState } from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity,
  KeyboardAvoidingView, ScrollView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomHeading from '../../components/CustomHeading/CustomHeading.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const LOCATION_ICON = require('../../assets/MapScreen/CurrentLocationZoom.png');
const SAMPLE_PHOTO  = require('../../assets/MapScreen/bull.png');

const EditSightingScreen = () => {
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(SAMPLE_PHOTO);

  return (
    <SettingsScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            <MainHeader onBackPress={() => navigation.goBack()} />

            <CustomHeading
              heading="Edit Sights"
              color={colors.white}
              headingFontSize={28}
              headingFontFamily={FONTS.display_bold}
              containerStyle={styles.headingContainer}
            />

            <Formik
              initialValues={{ title: '', location: '', date: 'May 20, 2025' }}
              onSubmit={(values) => console.log('Save:', values)}
            >
              {({ values, handleChange, handleSubmit, setFieldTouched }) => (
                <View style={styles.form}>
                  <Text style={styles.label}>Title</Text>
                  <CustomInput
                    placeholder="Enter Title"
                    value={values.title}
                    onChangeText={handleChange('title')}
                    onBlur={() => setFieldTouched('title', true)}
                    islabelshown={false}
                  />

                  <Text style={styles.label}>Location</Text>
                  <CustomInput
                    placeholder="Enter Your Location"
                    value={values.location}
                    onChangeText={handleChange('location')}
                    onBlur={() => setFieldTouched('location', true)}
                    image={LOCATION_ICON}
                    islabelshown={false}
                  />

                  <Text style={styles.label}>Date</Text>
                  <CustomInput
                    placeholder="May 20, 2025"
                    value={values.date}
                    onChangeText={handleChange('date')}
                    onBlur={() => setFieldTouched('date', true)}
                    islabelshown={false}
                  />

                  {/* Upload Photo */}
                  <Text style={styles.label}>Upload Photo</Text>
                  <TouchableOpacity style={styles.photoContainer} activeOpacity={0.85}>
                    <Image source={photo} style={styles.photoImage} resizeMode="cover" />
                    <View style={styles.changeOverlay}>
                      <Text style={styles.changeText}>Change</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.btnContainer}>
                    <CustomButton title="Save Changes" onPress={handleSubmit} />
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

export default EditSightingScreen;

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  container: { flex: 1, paddingHorizontal: vw(4.3), paddingBottom: vh(3) },
  headingContainer: { marginBottom: vh(2.5) },
  form: { flex: 1 },
  label: {
    fontSize: fs(14),
    fontFamily: FONTS.display_medium,
    color: colors.white,
    marginBottom: vh(0.8),
    marginTop: vh(1.5),
  },
  photoContainer: {
    width: '100%',
    height: vh(28),
    borderRadius: vw(3),
    overflow: 'hidden',
    marginTop: vh(0.5),
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  changeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: vh(1),
    alignItems: 'center',
  },
  changeText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_medium,
    color: colors.white,
    fontWeight: '600',
  },
  btnContainer: { marginTop: vh(3) },
});