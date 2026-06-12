import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  PanResponder,
  Alert,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import WaveformBar from '../../components/WaveformBar/WaveformBar.jsx';
import AudioService from '../../services/AudioService.js';
import { getAudioForMoose } from '../../utils/audioMap.js';
import {
  setSelectedMoose,
  setIsPlaying,
  setVolume,
} from '../../redux/Slices/homeSlice.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

// ─── Safe VolumeManager ───────────────────────────────────────────────────────
let VolumeManager = null;
try {
  const pkg = require('react-native-volume-manager');
  VolumeManager = pkg.VolumeManager ?? pkg.default ?? null;
} catch (e) { }

// ─── Assets ───────────────────────────────────────────────────────────────────
const NOTIFICATION = require('../../assets/MapScreen/notification.png');
const BULL_IMG = require('../../assets/HomeScreen/black-moose.png');
const ICON_VOLUME_LOW = require('../../assets/HomeScreen/volume-high.png');
const ICON_VOLUME_HIGH = require('../../assets/HomeScreen/volume-high.png');
const ICON_PENCIL = require('../../assets/HomeScreen/edit.png');
const ICON_TRASH = require('../../assets/HomeScreen/delete.png');
const ICON_MARKER = require('../../assets/HomeScreen/white-moose.png');
const ICON_USER_ADD = require('../../assets/HomeScreen/user-add.png');
const ICON_USERS = require('../../assets/HomeScreen/user-group.png');
const ICON_PLAY = require('../../assets/HomeScreen/play-btn.png');
const ICON_PAUSE = require('../../assets/HomeScreen/pause-btn.png');

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOOSE_TYPES = [
  { id: '1', name: 'Alaska-Yukon\nMoose', image: BULL_IMG },
  { id: '2', name: 'Northwestern\nMoose', image: BULL_IMG },
  { id: '3', name: 'Eastern\nMoose', image: BULL_IMG },
  { id: '4', name: 'Shiras\nMoose', image: BULL_IMG },
];

const RECENT_SIGHTINGS = [
  { id: '1', title: 'Large Bull Sighting', location: 'North Ridge', time: '06:45 AM' },
  { id: '2', title: 'Large Bull Sighting', location: 'North Ridge', time: '06:45 AM' },
];

// ─── Moose Card ───────────────────────────────────────────────────────────────
const MooseCard = ({ item, selected, onPress, dynamicStyles }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.mooseCard, dynamicStyles.mooseCard, selected && [styles.mooseCardSelected, dynamicStyles.mooseCardSelected]]}
  >
    <Image
      source={item.image}
      style={[styles.mooseImage, !selected && [styles.mooseImageTint, dynamicStyles.mooseImageTint]]}
      resizeMode="contain"
    />
    <Text style={[styles.mooseName, dynamicStyles?.mooseName, selected && [styles.mooseNameSelected, dynamicStyles?.mooseNameSelected]]}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

// ─── Sighting Row ─────────────────────────────────────────────────────────────
const SightingRow = ({ item, onEdit, onDelete, dynamicStyles }) => (
  <View style={[styles.sightingRow, dynamicStyles?.sightingRow]}>
    <View style={styles.sightingLeft}>
      <View style={[styles.sightingIconWrap, dynamicStyles?.sightingIconWrap]}>
        <Image source={ICON_MARKER} style={[styles.iconSm, dynamicStyles.iconSm]} resizeMode="contain" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.sightingTitle, dynamicStyles?.sightingTitle]}>{item.title}</Text>
        <Text style={[styles.sightingMeta, dynamicStyles?.sightingMeta]}>{item.location} - {item.time}</Text>
      </View>
    </View>
    <View style={styles.sightingActions}>
      <TouchableOpacity onPress={onEdit} style={styles.actionBtn}>
        <Image source={ICON_PENCIL} style={[styles.iconSm, dynamicStyles.iconSm]} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.actionBtn}>
        <Image source={ICON_TRASH} style={[styles.iconSm, dynamicStyles.iconSm]} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  </View>
);

// ─── Volume Slider ────────────────────────────────────────────────────────────
const VolumeSlider = ({ volume, onVolumeChange, sliderTrackStyle, volumeIconStyle }) => {
  const TRACK_WIDTH = vw(72);
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e) => {
      onVolumeChange(Math.min(1, Math.max(0, e.nativeEvent.locationX / TRACK_WIDTH)));
    },
    onPanResponderMove: (e) => {
      onVolumeChange(Math.min(1, Math.max(0, e.nativeEvent.locationX / TRACK_WIDTH)));
    },
  })).current;

  return (
    <View style={styles.volumeRow}>
      <Image source={ICON_VOLUME_LOW} style={[styles.volumeIcon, volumeIconStyle]} resizeMode="contain" />
      <View style={[styles.sliderTrack, sliderTrackStyle, { width: TRACK_WIDTH }]} {...panResponder.panHandlers}>
        <View style={[styles.sliderFill, { width: `${volume * 100}%` }]} />
        <View style={[styles.sliderThumb, { left: `${volume * 100}%` }]} />
      </View>
      <Image source={ICON_VOLUME_HIGH} style={[styles.volumeIcon, volumeIconStyle]} resizeMode="contain" />
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors: themeColors, dark } = useTheme();
  const waveformBarColor = dark ? colors.primary[0] : colors.primary[0];

  // ── Redux state ──────────────────────────────────────────────────────
  const { selectedMoose, isPlaying, volume } = useSelector(state => state.home);

  // ── Dynamic styles ────────────────────────────────────────────────────
  const dynamicStyles = StyleSheet.create({
    welcomeText: {
      color: dark ? themeColors.text : '#111827',
    },
    welcomeName: {
      color: colors.lightYellow,
    },
    mooseName: {
      color: dark ? themeColors.text : '#111827',
    },
    mooseNameSelected: {
      color: dark ? colors.black : '#111827',
    },
    sectionTitle: {
      color: dark ? themeColors.text : '#111827',
    },
    sightingTitle: {
      color: dark ? themeColors.text : '#111827',
    },
    sightingMeta: {
      color: dark ? colors.textHint : 'rgba(17, 24, 39, 0.72)',
    },
    // audioCard: {
    //   backgroundColor: dark ? 'red' : 'rgba(255,255,255,0.95)',
    //   borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(15, 23, 42, 0.08)',
    //   shadowColor: dark ? 'rgba(0,0,0,0.35)' : 'rgba(15, 23, 42, 0.12)',
    // },
    mooseCard: {
      backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.96)',
      borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(15, 23, 42, 0.08)',
      shadowColor: dark ? 'rgba(0,0,0,0.28)' : 'rgba(15, 23, 42, 0.10)',
    },
    mooseCardSelected: {
      backgroundColor: dark ? colors.lightYellow : '#F9D084',
    },
    sightingRow: {
      backgroundColor: dark ? 'rgba(255,255,255,0.07)' : '#EEEEEE',
      borderColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(15, 23, 42, 0.08)',
      shadowColor: dark ? 'rgba(0,0,0,0.20)' : 'rgba(15, 23, 42, 0.08)',
    },
    sightingIconWrap: {
      backgroundColor: dark ? 'rgba(255,215,0,0.12)' : 'rgba(15, 23, 42, 0.06)',
    },
    mooseImageTint: {
      tintColor: dark ? colors.white : '#111827',
    },
    volumeIcon: {
      tintColor: dark ? colors.primary[0] : '#111827',
    },
    iconSm: {
      tintColor: dark ? colors.primary[0] : colors.secondary,
    },
   playIcon: {
  tintColor: dark ? colors.primary[0] : "red",
},
    notifBtn: {
      // backgroundColor: dark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.95)',
      borderColor: dark ? 'rgba(255,255,255,0.15)' : 'rgba(15, 23, 42, 0.10)',
    },
    notifIcon: {
      tintColor: dark ? colors.primary[0] : colors.secondary,
    },
    sliderTrack: {
      backgroundColor: dark ? 'rgba(255,255,255,0.2)' : 'rgba(15, 23, 42, 0.10)',
    },
    groupBtn: {
      backgroundColor: dark ? colors.primary[0] : '#F9D084',
    },
    groupBtnText: {
      color: dark ? colors.black : '#2D2D2D',
    },
    groupBtnIcon: {
      tintColor: dark ? colors.black : '#2D2D2D',
    },
    viewAll: {
      color: dark ? colors.primary[0] : colors.black,
    },
  });

  // ── Volume Manager init ───────────────────────────────────────────────────
  useEffect(() => {
    if (!VolumeManager) return;
    VolumeManager.getVolume().then((r) => {
      dispatch(setVolume(r?.volume ?? 0.7));
    }).catch(() => { });
    const sub = VolumeManager.addVolumeListener?.((r) => {
      dispatch(setVolume(r?.volume ?? 0.7));
    });
    return () => sub?.remove?.();
  }, []);

  // ── Stop audio on unmount ─────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      AudioService.stopAudio?.();
    };
  }, []);

  // ── Play / Pause handler ──────────────────────────────────────────────────
  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        // pause
        await AudioService.pauseAudio();
        dispatch(setIsPlaying(false));
      } else {
        // play selected moose audio
        const audio = getAudioForMoose(selectedMoose);
        if (!audio) {
          Alert.alert('Error', 'Audio not available for this moose');
          return;
        }
        await AudioService.playAudio(audio, () => {
          // auto-reset when audio ends
          dispatch(setIsPlaying(false));
        });
        dispatch(setIsPlaying(true));
      }
    } catch (err) {
      console.error('Audio error:', err);
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  // ── Moose selection — stop current audio + switch ─────────────────────────
  const handleMooseSelect = async (id) => {
    if (isPlaying) {
      await AudioService.stopAudio?.();
      dispatch(setIsPlaying(false));
    }
    dispatch(setSelectedMoose(id));
  };

  // ── Volume change ─────────────────────────────────────────────────────────
  const handleVolumeChange = async (val) => {
    dispatch(setVolume(val));
    if (VolumeManager) {
      try { await VolumeManager.setVolume(val); } catch (_) { }
    }
  };

  return (
    <SettingsScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <Text style={[styles.welcomeText, dynamicStyles.welcomeText]}>
            Welcome <Text style={[styles.welcomeName, dynamicStyles.welcomeName]}>Alex</Text>
          </Text>
          <TouchableOpacity style={[styles.notifBtn, dynamicStyles.notifBtn]} activeOpacity={0.8}>
            <Image source={NOTIFICATION} style={[styles.notifIcon, dynamicStyles.notifIcon]} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* ── Audio Card ── */}
        <View style={[styles.audioCard, dynamicStyles.audioCard]}>
          <WaveformBar
            style={styles.waveform}
            barColor={waveformBarColor}
            count={45}
            isPlaying={isPlaying}
          />

          <TouchableOpacity style={styles.playBtn} activeOpacity={0.8} onPress={handlePlayPause}>
            <Image
              source={isPlaying ? ICON_PAUSE : ICON_PLAY}
              style={[styles.playIcon]}

              resizeMode="contain"
            />
          </TouchableOpacity>

          <VolumeSlider
            volume={volume}
            onVolumeChange={handleVolumeChange}
            sliderTrackStyle={dynamicStyles.sliderTrack}
            volumeIconStyle={dynamicStyles.volumeIcon}
          />
        </View>

        {/* ── Moose Type Selector ── */}
        <FlatList
          data={MOOSE_TYPES}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={styles.mooseList}
          renderItem={({ item }) => (
            <MooseCard
              item={item}
              selected={selectedMoose === item.id}
              onPress={() => handleMooseSelect(item.id)}
              dynamicStyles={dynamicStyles}
            />
          )}
        />

        {/* ── Recent Sights & Locations ── */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Recent Sights & Locations</Text>
          <TouchableOpacity onPress={() => navigation.navigate('recent_sightings')}>
            <Text style={[styles.viewAll, dynamicStyles.viewAll]}>View All</Text>
          </TouchableOpacity>
        </View>

        {RECENT_SIGHTINGS.map(item => (
          <SightingRow
            key={item.id}
            item={item}
            onEdit={() => navigation.navigate('edit_sighting', { id: item.id })}
            onDelete={() => { }}
            dynamicStyles={dynamicStyles}
          />
        ))}

        {/* ── Bottom Buttons ── */}
        <View style={styles.groupBtns}>
          <TouchableOpacity style={[styles.groupBtn, dynamicStyles.groupBtn]} activeOpacity={0.85} onPress={() => navigation.navigate('create_hunt_group')}>
            <Image source={ICON_USER_ADD} style={[styles.groupBtnIcon, dynamicStyles.groupBtnIcon]} resizeMode="contain" />
            <Text style={[styles.groupBtnText, dynamicStyles.groupBtnText]}>Create Hunt Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.groupBtn, dynamicStyles.groupBtn]} activeOpacity={0.85} onPress={() => navigation.navigate('join_hunt_group')}>
            <Image source={ICON_USERS} style={[styles.groupBtnIcon, dynamicStyles.groupBtnIcon]} resizeMode="contain" />
            <Text style={[styles.groupBtnText, dynamicStyles.groupBtnText]}>Join Hunt Group</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SettingsScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContent: { paddingHorizontal: vw(4.3), paddingBottom: vh(4) },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: vh(1), marginBottom: vh(2) },
  welcomeText: { fontSize: fs(22), fontFamily: FONTS.display_bold, fontWeight: '700' },
  welcomeName: {},
  notifBtn: { width: vw(11), height: vw(11), borderRadius: vw(5.5), justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  notifIcon: { width: vw(5), height: vw(5), tintColor: colors.lightYellow },
  audioCard: { borderRadius: vw(4), padding: vw(4), marginBottom: vh(2.5), alignItems: 'center' },
  waveform: { width: '100%', height: 70, marginBottom: vh(1.5) },
  playBtn: { width: vw(20), height: vw(20), justifyContent: 'center', alignItems: 'center', marginBottom: vh(2) },
  playIcon: { width: vw(16), height: vw(16) },
  volumeRow: { flexDirection: 'row', alignItems: 'center', width: '100%', gap: vw(2) },
  volumeIcon: { width: vw(5), height: vw(5) },
  sliderTrack: { flex: 1, height: 6, borderRadius: 3, justifyContent: 'center' },
  sliderFill: { height: 6, backgroundColor: colors.lightYellow, borderRadius: 3, position: 'absolute', left: 0 },
  sliderThumb: { position: 'absolute', width: vw(4.5), height: vw(4.5), borderRadius: vw(2.25), backgroundColor: colors.lightYellow, marginLeft: -vw(2.25), top: -vw(1.4), elevation: 4 },
  mooseList: { gap: vw(2.5), marginBottom: vh(2.5) },
  mooseCard: { width: vw(21), alignItems: 'center', borderRadius: vw(3), paddingVertical: vw(2.5), paddingHorizontal: vw(1.5), borderWidth: 1, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 2 },
  mooseCardSelected: { backgroundColor: colors.lightYellow },
  mooseImage: { width: vw(12), height: vw(12), borderRadius: vw(2), marginBottom: vw(1.5) },
  mooseImageTint: { tintColor: colors.white },
  mooseName: { fontSize: fs(9), fontFamily: FONTS.display_medium, textAlign: 'center', lineHeight: fs(13) },
  mooseNameSelected: { fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: vh(1.5) },
  sectionTitle: { fontSize: fs(16), fontFamily: FONTS.display_bold, fontWeight: '700' },
  viewAll: { fontSize: fs(12), fontFamily: FONTS.display_regular, color: colors.lightYellow },
  sightingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: vw(3), padding: vw(3.5), marginBottom: vh(1.2), borderWidth: 1, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 6, elevation: 2 },
  sightingLeft: { flexDirection: 'row', alignItems: 'center', gap: vw(3), flex: 1 },
  sightingIconWrap: { width: vw(9), height: vw(9), borderRadius: vw(2), backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  iconSm: { width: vw(4.5), height: vw(4.5), tintColor: colors.lightYellow },
  sightingTitle: { fontSize: fs(13), fontFamily: FONTS.display_bold, fontWeight: '600' },
  sightingMeta: { fontSize: fs(11), fontFamily: FONTS.display_regular, marginTop: 2 },
  sightingActions: { flexDirection: 'row', gap: vw(3) },
  actionBtn: { padding: vw(1.5) },
  groupBtns: { flexDirection: 'row', gap: vw(3), marginTop: vh(2.5) },
  groupBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: vw(3), paddingVertical: vh(2), gap: vw(2), elevation: 5 },
  groupBtnIcon: { width: vw(4.5), height: vw(4.5) },
  groupBtnText: { fontSize: fs(12), fontFamily: FONTS.display_bold, fontWeight: '700', textAlign: 'center' },
});