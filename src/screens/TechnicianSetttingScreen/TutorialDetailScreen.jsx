import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { FONTS } from '../../utils/fonts.js';
import colors from '../../utils/color.js';
import { vh, vw } from '../../utils/responsive.js';

const HERO = require('../../assets/TechnicianSettingImages/my_resume.png');
const THUMB = require('../../assets/TechnicianSettingImages/post.png');

const TutorialDetailScreen = () => {
  const { colors: themeColors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    videoTitle: {
      color: themeColors.text,
    },
    subTitle: {
      color: themeColors.text,
    },
    relatedTitle: {
      color: themeColors.text,
    },
  });
  return (
    <SettingsScreenWrapper style={styles.safe}>
      <MainHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={HERO} style={styles.hero} />

        <View style={styles.contentBox}>
          <Text style={[styles.videoTitle, dynamicStyles.videoTitle]}>Moose Calling</Text>
          <Text style={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</Text>

          <Text style={[styles.subTitle, dynamicStyles.subTitle]}>What you will learn</Text>
          <View style={styles.bullets}>
            <Text style={styles.bullet}>• Brief overview of the session</Text>
            <Text style={styles.bullet}>• Brief overview of the session</Text>
            <Text style={styles.bullet}>• Brief overview of the session</Text>
          </View>

          <Text style={[styles.subTitle, dynamicStyles.subTitle]}>Related videos</Text>
          <View style={styles.relatedList}>
            {[1,2].map((i) => (
              <View key={i} style={styles.relatedCard}>
                <Image source={THUMB} style={styles.relatedThumb} />
                <View style={{flex:1, paddingLeft:10}}>
                  <Text style={[styles.relatedTitle, dynamicStyles.relatedTitle]}>Moose Calling</Text>
                </View>
                <View style={styles.playBtnSmall} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SettingsScreenWrapper>
  );
};

export default TutorialDetailScreen;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingBottom: 120 },
  hero: { width: '100%', height: vh(30), resizeMode: 'cover' },
  contentBox: { backgroundColor: '#092414', marginTop: -30, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 18 },
  videoTitle: { fontFamily: FONTS.display_bold, fontSize: 18, marginBottom: 8 },
  desc: { color: colors.description, fontFamily: FONTS.display_regular, marginBottom: 12 },
  subTitle: { fontFamily: FONTS.display_bold, marginTop: 12, marginBottom: 8 },
  bullets: { paddingLeft: 8 },
  bullet: { color: colors.description, marginBottom: 6 },
  relatedList: { marginTop: 8 },
  relatedCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0e2918', padding: 10, borderRadius: 10, marginBottom: 8 },
  relatedThumb: { width: 72, height: 48, borderRadius: 8 },
  relatedTitle: { fontFamily: FONTS.display_regular },
  playBtnSmall: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary[0] },
});
