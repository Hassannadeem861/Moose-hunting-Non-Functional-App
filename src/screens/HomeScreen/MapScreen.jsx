import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

// ─── Asset imports ──────────────────────────────────────────────────────────
const BG_IMAGE      = require('../../assets/MapScreen/mapBackground.png');
const NOTIFICATION  = require('../../assets/MapScreen/notification.png');
const LOCATION_ICON = require('../../assets/MapScreen/CurrentLocationZoom.png');
const BULL_IMG      = require('../../assets/MapScreen/bull.png');
const MAP_PIN       = require('../../assets/MapScreen/locationDirectionIndicator.png');

// ─── Mock Data ──────────────────────────────────────────────────────────────
const SIGHTINGS = [
  { id: '1', title: 'Large Bull Sighting', location: 'North Ridge', author: 'By John Doe', side: 'left',  x: vw(4), y: vh(7)  },
  { id: '2', title: 'Large Bull Sighting', location: 'North Ridge', author: 'By John Doe', side: 'right', x: vw(4), y: vh(22) },
  { id: '3', title: 'Large Bull Sighting', location: 'North Ridge', author: 'By John Doe', side: 'left',  x: vw(4), y: vh(38) },
  { id: '4', title: 'Large Bull Sighting', location: 'North Ridge', author: 'By John Doe', side: 'right', x: vw(4), y: vh(54) },
];

// ─── Sighting Card ───────────────────────────────────────────────────────────
const SightingCard = ({ item, dynamicStyles }) => {
  const positionStyle = item.side === 'right' ? { right: item.x } : { left: item.x };
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.card, { top: item.y }, positionStyle]}
    >
      <Image source={BULL_IMG} style={styles.cardImage} />
      <View style={styles.cardText}>
        <Text style={[styles.cardTitle, dynamicStyles?.cardTitle]}>{item.title}</Text>
        <Text style={[styles.cardLocation, dynamicStyles?.cardLocation]}>{item.location}</Text>
        <Text style={[styles.cardAuthor, dynamicStyles?.cardAuthor]}>{item.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

// ─── Main Screen ─────────────────────────────────────────────────────
const MapScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors: themeColors, dark } = useTheme();

  const dynamicStyles = StyleSheet.create({
    screenTitle: {
      color: dark ? themeColors.text : '#111827',
      textShadowColor: 'rgba(0, 0, 0, 0.35)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    cardTitle: {
      color: themeColors.text,
    },
    cardLocation: {
      color: themeColors.text,
    },
    cardAuthor: {
      color: themeColors.text === colors.white ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)',
    },
    addHuntText: {
      color: dark ? colors.black : '#2D2D2D',
    },
    addHuntBtn: {
      backgroundColor: dark ? colors.lightYellow : null,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground source={BG_IMAGE} style={styles.bgImage} resizeMode="cover">

        {/* ── Top Bar — SafeAreaView top only ── */}
        <SafeAreaView edges={['top']} style={styles.safeTop}>
          <View style={styles.topBar}>
            <View style={[styles.headingWrap, !dark && styles.headingWrapLight]}>
              <Text style={[styles.screenTitle, dynamicStyles.screenTitle]}>Hunting Map</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn} activeOpacity={0.8}>
              <Image source={NOTIFICATION} style={styles.notifIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* ── Map Area ── */}
        <View style={styles.mapArea} pointerEvents="box-none">
          {SIGHTINGS.map((item) => (
            <SightingCard key={item.id} item={item} dynamicStyles={dynamicStyles} />
          ))}
          <View style={styles.centerPin}>
            <Image source={MAP_PIN} style={styles.mapPinIcon} resizeMode="contain" />
          </View>
        </View>

        {/* ── Bottom Bar — SafeAreaView bottom only ── */}
        {/* ✅ edges={['bottom']} → hamesha nav bar ke upar rahega, iOS & Android dono pe */}
        <SafeAreaView edges={['bottom']} style={styles.safeBottom}>
          <View style={styles.bottomBar}>

            {dark ? (
              <TouchableOpacity
                style={[styles.addHuntBtn, dynamicStyles.addHuntBtn]}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('add_new_sighting')}
              >
                <Text style={[styles.addHuntText, dynamicStyles.addHuntText]}>+ Add Hunt</Text>
              </TouchableOpacity>
            ) : (
              <LinearGradient
                colors={['#F9D084', '#F0C76F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.addHuntBtn, styles.addHuntGradient]}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('add_new_sighting')}
                  style={styles.addHuntTouch}
                >
                  <Text style={[styles.addHuntText, dynamicStyles.addHuntText]}>+ Add Hunt</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}

            <TouchableOpacity style={styles.gpsBtn} activeOpacity={0.8}>
              <Image source={LOCATION_ICON} style={styles.gpsIcon} resizeMode="contain" />
            </TouchableOpacity>

          </View>
        </SafeAreaView>

      </ImageBackground>
    </View>
  );
};

export default MapScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  // ── Safe wrappers (transparent, no color)
  safeTop: {
    backgroundColor: 'transparent',
  },
  safeBottom: {
    backgroundColor: 'transparent',
  },

  // ── Top Bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4.3),
    paddingVertical: vh(1.2),
  },
  headingWrap: {
    flexShrink: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headingWrapLight: {
    backgroundColor: 'rgba(255,255,255,0.72)',
  },
  screenTitle: {
    fontSize: fs(22),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
  },
  notifBtn: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(5.5),
    backgroundColor: 'rgba(0,0,0,0.40)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  notifIcon: {
    width: vw(5),
    height: vw(5),
    tintColor: colors.lightYellow,
  },

  // ── Map Area
  mapArea: {
    flex: 1,
    position: 'relative',
  },

  // ── Floating Cards
  card: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightYellow,
    borderRadius: vw(3),
    paddingHorizontal: vw(2.5),
    paddingVertical: vh(1),
    width: vw(55),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardImage: {
    width: vw(12),
    height: vw(12),
    borderRadius: vw(2),
    resizeMode: 'cover',
    marginRight: vw(2),
    backgroundColor: colors.darkGreen,
  },
  cardText: { flex: 1 },
  cardTitle: {
    fontSize: fs(11),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
  },
  cardLocation: {
    fontSize: fs(10),
    fontFamily: FONTS.display_medium,
    marginTop: 1,
  },
  cardAuthor: {
    fontSize: fs(9),
    fontFamily: FONTS.display_regular,
    marginTop: 1,
  },

  // ── Center Pin
  centerPin: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -vw(30),
    marginTop: -vw(5),
    width: vw(10),
    height: vw(10),
    borderRadius: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',
  },
  mapPinIcon: {
    width: vw(6),
    height: vw(6),
  },

  // ── Bottom Bar
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: vw(4.3),
    paddingVertical: vh(15),
  },

  // + Add Hunt
  addHuntBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: vw(3),
    paddingHorizontal: vw(6),
    paddingVertical: vh(1.8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
    elevation: 6,
  },
  addHuntGradient: {
    overflow: 'hidden',
  },
  addHuntTouch: {
    paddingHorizontal: vw(0),
    paddingVertical: 0,
  },
  addHuntText: {
    fontSize: fs(14),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
  },

  // GPS button
  gpsBtn: {
    width: vw(13),
    height: vw(13),
    borderRadius: vw(6.5),
    backgroundColor: 'rgba(0,0,0,0.42)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  gpsIcon: {
    width: vw(7),
    height: vw(7),
  },
});