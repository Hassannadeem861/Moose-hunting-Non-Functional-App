import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import { useTheme } from '@react-navigation/native';
import MainHeader from '../../components/CustomHeader/CustomHeader';
import CustomHeading from '../../components/CustomHeading/CustomHeading';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import AuthScreenWrapper from '../../components/AuthScreenWrapper';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

// ─── Asset imports ────────────────────────────────────────────────────────────
const LOCATION_ICON  = require('../../assets/MapScreen/location.png');   
// const CALENDAR_ICON  = require('../../assets/calendar.png');        

const AddNewSighting = () => {
  const { dark, colors: themeColors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    headingColor: {
      color: dark ? colors.white : '#111827',
    },
    fieldLabel: {
      color: dark ? colors.white : '#111827',
    },
  });

  const handleSave = (values) => {
    console.log('Sighting saved:', values);
    // dispatch your action here
  };

  return (

    <AuthScreenWrapper style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.mainContainer}>

              {/* ── Header ───────────────────────────────────────────── */}
              <MainHeader isbackbtnshow={true} />

              {/* ── Title ────────────────────────────────────────────── */}
              <CustomHeading
                containerStyle={styles.headingContainer}
                heading="Add New Sighting"
                color={dark ? colors.white : '#111827'}
                headingFontSize={28}
                headingFontFamily={FONTS.display_medium}
              />

              {/* ── Form ─────────────────────────────────────────────── */}
              <Formik
                initialValues={{
                  title: '',
                  location: '',
                  date: '',
                }}
                onSubmit={handleSave}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  setFieldTouched,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <View style={styles.formContainer}>

                    {/* Title */}
                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Title</Text>
                    <CustomInput
                      placeholder="Enter Title"
                      value={values.title}
                      onChangeText={handleChange('title')}
                      onBlur={() => setFieldTouched('title', true)}
                      autoCapitalize="words"
                      islabelshown={false}
                    />

                    {/* Location */}
                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Location</Text>
                    <CustomInput
                      placeholder="Enter Your Location"
                      value={values.location}
                      onChangeText={handleChange('location')}
                      onBlur={() => setFieldTouched('location', true)}
                      autoCapitalize="none"
                      islabelshown={false}
                      image={LOCATION_ICON}   
                      imagePosition="left"   // add this prop support in CustomInput if needed
                    />

                    {/* Date */}
                    <Text style={[styles.fieldLabel, dynamicStyles.fieldLabel]}>Date</Text>
                    <CustomInput
                      placeholder="May 20, 2025"
                      value={values.date}
                      onChangeText={handleChange('date')}
                      onBlur={() => setFieldTouched('date', true)}
                      autoCapitalize="none"
                      islabelshown={false}
                      // image={CALENDAR_ICON}
                    />

                    {/* ── Save Button ───────────────────────────────── */}
                    <View style={styles.buttonContainer}>
                      <CustomButton
                        title="Save Location"
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        // variant="primary" gives the yellow gradient (default)
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

export default AddNewSighting;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: vw(4.3),
    paddingBottom: vh(3),
  },

  // ── Heading
  headingContainer: {
    marginTop: vh(1.5),
    marginBottom: vh(3),
  },

  // ── Form
  formContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: fs(14),
    fontFamily: FONTS.display_medium,
    color: colors.white,
    marginBottom: vh(0.8),
    marginTop: vh(1.5),
  },

  // ── Button
  buttonContainer: {
    marginTop: vh(4),
  },
});