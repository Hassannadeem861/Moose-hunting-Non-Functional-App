import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { FONTS } from '../../utils/fonts.js';
import colors from '../../utils/color.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const HERO = require('../../assets/TechnicianSettingImages/my_resume.png');
const THUMB = require('../../assets/TechnicianSettingImages/post.png');

const DATA = new Array(4).fill(0).map((_, i) => ({
  id: String(i + 1),
  title: 'Moose Calling',
  subtitle: 'Short description of the tutorial goes here',
}));

const Item = ({ item, onPress, dynamicStyles }) => (
  <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
    <Image source={THUMB} style={styles.cardThumb} />
    <View style={styles.cardBody}>
      <Text style={[styles.cardTitle, dynamicStyles.cardTitle]}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    </View>
    <View style={styles.playWrap}>
      <View style={styles.playBtn} />
    </View>
  </TouchableOpacity>
);

const TutorialsAndCoachingScreen = ({ navigation }) => {
  const { colors: themeColors } = useTheme();
  
  const dynamicStyles = StyleSheet.create({
    title: {
      color: themeColors.text,
    },
    sectionTitle: {
      color: themeColors.text,
    },
    cardTitle: {
      color: themeColors.text,
    },
  });

  const openDetail = () => navigation?.navigate?.('tutorial_detailScreen');

  return (
    <SettingsScreenWrapper style={styles.safe}>
      <MainHeader />

      <Text style={[styles.title, dynamicStyles.title]}>Tutorials & Coaching</Text>

      <Image source={HERO} style={styles.hero} />

      <View style={styles.tagRow}>
        <View style={[styles.tag, styles.tagActive]}>
          <Text style={styles.tagTextActive}>Alaska-Yukon Moose</Text>
        </View>
        <View style={styles.tag}><Text style={styles.tagText}>Northwestern</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>Eastern</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>Shiras</Text></View>
      </View>

      <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Recommended for you</Text>

      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <Item item={item} onPress={openDetail} dynamicStyles={dynamicStyles} />}
        contentContainerStyle={styles.list}
      />
    </SettingsScreenWrapper>
  );
};

export default TutorialsAndCoachingScreen;

const styles = StyleSheet.create({
  safe: { flex: 1 },
  title: { fontSize: 20, fontFamily: FONTS.display_bold, textAlign: 'center', marginTop: 8 },
  hero: { width: '94%', height: vh(20), alignSelf: 'center', borderRadius: 12, marginTop: 12, resizeMode: 'cover' },
  tagRow: { flexDirection: 'row', paddingHorizontal: 18, marginTop: 12, gap: 8 },
  tag: { backgroundColor: '#113018', padding: 8, borderRadius: 12 },
  tagActive: { backgroundColor: colors.primary[0] },
  tagText: { color: colors.white, fontFamily: FONTS.display_regular },
  tagTextActive: { color: '#0A0A0A', fontFamily: FONTS.display_bold },
  sectionTitle: { marginTop: 18, marginLeft: 18, fontFamily: FONTS.display_bold, fontSize: 16 },
  list: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 120 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0e2616', borderRadius: 12, padding: 10, marginBottom: 12 },
  cardThumb: { width: 78, height: 54, borderRadius: 8, resizeMode: 'cover' },
  cardBody: { flex: 1, paddingHorizontal: 10 },
  cardTitle: { fontFamily: FONTS.display_bold },
  cardSubtitle: { color: colors.description, fontFamily: FONTS.display_regular, marginTop: 4 },
  playWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 30, height: 30, backgroundColor: colors.primary[0], borderRadius: 15 },
});
