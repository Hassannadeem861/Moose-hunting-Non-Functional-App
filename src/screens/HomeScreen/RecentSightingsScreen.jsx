import React, { useEffect } from 'react';
import {
  StyleSheet, View, Text, Image,
  TouchableOpacity, FlatList, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import { setSightings, deleteSighting } from '../../redux/Slices/homeSlice.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

// ─── Assets ───────────────────────────────────────────────────────────────────
const BULL_IMG    = require('../../assets/MapScreen/bull.png');
const ICON_PENCIL = require('../../assets/HomeScreen/edit.png');
const ICON_TRASH  = require('../../assets/HomeScreen/delete.png');

// ─── Mock data (replace with API call when ready) ─────────────────────────────
const MOCK_DATA = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  title: 'Large Bull Sighting',
  location: 'North Ridge',
  date: 'May 20, 2026',
  image: BULL_IMG,
}));

// ─── Sighting Item ────────────────────────────────────────────────────────────
const SightingItem = ({ item, onEdit, onDelete, dynamicStyles }) => (
  <View style={styles.row}>
    <Image source={item.image ?? BULL_IMG} style={styles.rowImage} resizeMode="cover" />
    <View style={styles.rowInfo}>
      <Text style={[styles.rowTitle, dynamicStyles.rowTitle]}>{item.title}</Text>
      <Text style={styles.rowMeta}>{item.location} - {item.date}</Text>
    </View>
    <View style={styles.rowActions}>
      <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
        <Image source={ICON_PENCIL} style={styles.actionIcon} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.actionBtn}>
        <Image source={ICON_TRASH} style={styles.actionIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
const RecentSightingsScreen = () => {
  const navigation = useNavigation();
  const dispatch   = useDispatch();
  const { colors: themeColors } = useTheme();

  // ── Redux state ──────────────────────────────────────────────────────────
  const sightings = useSelector(state => state.home.sightings);

  // ── Dynamic Styles ──
  // Theme ke base par styles update hoti hain
  const dynamicStyles = StyleSheet.create({
    title: {
      color: themeColors.text,
    },
    rowTitle: {
      color: themeColors.text,
    },
  });

  // ── Load mock data into Redux on mount (replace with API thunk later) ────
  useEffect(() => {
    if (sightings.length === 0) {
      dispatch(setSightings(MOCK_DATA));
    }
  }, []);

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    Alert.alert('Delete', 'Delete this sighting?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => dispatch(deleteSighting(id)),
      },
    ]);
  };

  return (
    <SettingsScreenWrapper>
      <View style={styles.container}>
        <MainHeader onBackPress={() => navigation.goBack()} />
        <Text style={[styles.title, dynamicStyles.title]}>Recent Sights & Locations</Text>
        <FlatList
          data={sightings}
          keyExtractor={i => i.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <SightingItem
              item={item}
              dynamicStyles={dynamicStyles}
              onEdit={() => navigation.navigate('edit_sighting', { id: item.id })}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      </View>
    </SettingsScreenWrapper>
  );
};

export default RecentSightingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: vw(4.3) },
  title: {
    fontSize: fs(22),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    marginBottom: vh(2),
    marginTop: vh(0.5),
  },
  list: { paddingBottom: vh(3) },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: vw(3),
    padding: vw(2.5),
    marginBottom: vh(1.2),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  rowImage: {
    width: vw(13),
    height: vw(13),
    borderRadius: vw(2.5),
    marginRight: vw(3),
    backgroundColor: colors.darkGreen,
  },
  rowInfo: { flex: 1 },
  rowTitle: {
    fontSize: fs(13),
    fontFamily: FONTS.display_bold,
    fontWeight: '600',
  },
  rowMeta: {
    fontSize: fs(11),
    fontFamily: FONTS.display_regular,
    color: colors.description,
    marginTop: 2,
  },
  rowActions: { flexDirection: 'row', gap: vw(3) },
  actionBtn: { padding: vw(1.5) },
  actionIcon: {
    width: vw(4.5),
    height: vw(4.5),
    tintColor: colors.lightYellow,
  },
});