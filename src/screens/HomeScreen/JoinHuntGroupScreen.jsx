import React from 'react';
import {
  StyleSheet, View, Text,
  KeyboardAvoidingView, ScrollView, Platform, TouchableWithoutFeedback, Keyboard,
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

const GROUP_ICON = require('../../assets/MapScreen/notification.png'); // replace with group icon

const JoinHuntGroupScreen = () => {
  const navigation = useNavigation();

  return (
    <SettingsScreenWrapper>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
              <MainHeader onBackPress={() => navigation.goBack()} />

              <CustomHeading
                heading="Join Hunt Group"
                color={colors.white}
                headingFontSize={28}
                headingFontFamily={FONTS.display_bold}
                containerStyle={styles.headingContainer}
              />

              <Formik
                initialValues={{ groupName: '', password: '' }}
                onSubmit={(values) => console.log('Join:', values)}
              >
                {({ values, handleChange, handleSubmit, setFieldTouched }) => (
                  <View style={styles.form}>
                    <Text style={styles.label}>Group Name</Text>
                    <CustomInput
                      placeholder="Enter Group Name"
                      value={values.groupName}
                      onChangeText={handleChange('groupName')}
                      onBlur={() => setFieldTouched('groupName', true)}
                      islabelshown={false}
                    />

                    <Text style={styles.label}>Password</Text>
                    <CustomInput
                      placeholder="Enter Password"
                      isPassword={true}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={() => setFieldTouched('password', true)}
                      islabelshown={false}
                    />

                    <View style={styles.btnContainer}>
                      <CustomButton title="Join Group" onPress={handleSubmit} />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SettingsScreenWrapper>
  );
};

export default JoinHuntGroupScreen;

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
  btnContainer: { marginTop: vh(4) },
});