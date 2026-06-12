import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import WaveformBar from '../../components/WaveformBar/WaveformBar.jsx';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { vh } from '../../utils/responsive.js';

const MOOSE_SOUNDS = [
  {
    id: '1',
    name: 'Alaska-Yukon Moose',
    icon: '🫎',
  },
  {
    id: '2',
    name: 'Northwestern Moose',
    icon: '🫎',
  },
  {
    id: '3',
    name: 'Eastern Moose',
    icon: '🫎',
  },
  {
    id: '4',
    name: 'Shiras Moose',
    icon: '🫎',
  },
];

const PracticeModeScreen = () => {
  const navigation = useNavigation();
  const { colors: themeColors, dark } = useTheme();

  const dynamicStyles = StyleSheet.create({
    pageTitle: {
      color: themeColors.text,
    },
    mooseName: {
      color: themeColors.text,
    },
    card: {
      backgroundColor: dark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(255,255,255,0.95)',
      borderColor: dark
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(15, 23, 42, 0.08)',
      shadowColor: dark ? 'rgba(0,0,0,0.45)' : 'rgba(15, 23, 42, 0.12)',
    },
    arrowIcon: {
      color: dark ? colors.lightYellow : colors.secondary,
    },
  });

  const handleMoosePress = (item) => {
    navigation.navigate('practice_call', {
      mooseId: item.id,
      mooseName: item.name,
    });
  };

  const renderMooseCard = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => handleMoosePress(item)}
        activeOpacity={0.7}
        style={[styles.card, dynamicStyles.card]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.mooseInfo}>
            <Text style={styles.mooseIcon}>{item.icon}</Text>
            <View style={styles.mooseTextContainer}>
              <Text style={[styles.mooseName, dynamicStyles.mooseName]}>{item.name}</Text>
            </View>
          </View>
          <Text style={[styles.arrowIcon, dynamicStyles.arrowIcon]}>›</Text>
        </View>
        <WaveformBar style={styles.waveform} barColor={colors.primary[0]} count={40} />
      </TouchableOpacity>
    );
  };

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <MainHeader
            containerStyle={styles.header}
            isbackbtnshow={false}
          />
          <Text style={[styles.pageTitle, dynamicStyles.pageTitle]}>Practice Mode</Text>
        </View>

        {/* Notification Bell */}
        {/* <TouchableOpacity style={styles.notificationBell} activeOpacity={0.7}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity> */}

        {/* Moose List */}
        <View style={styles.mooseListContainer}>
          {MOOSE_SOUNDS.map((item) => renderMooseCard(item))}
        </View>

        <View style={styles.spacer} />
      </ScrollView>
      <View style={styles.bottomPadding}/>
    </SettingsScreenWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    marginTop: vh(1),
  },
  header: {
    paddingHorizontal: 0,
    paddingVertical: 8,
  },
  pageTitle: {
    fontFamily: FONTS.display_bold,
    fontSize: 28,
    // marginBottom: vh(2),
    marginTop: vh(1),
  },
  notificationBell: {
    position: 'absolute',
    top: vh(4),
    right: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 24,
  },
  mooseListContainer: {
    marginTop: vh(3),
  },
  card: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.2,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mooseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mooseIcon: {
    fontSize: 30,
    marginRight: 10,
    width: 40,
    textAlign: 'center',
  },
  mooseTextContainer: {
    flex: 1,
  },
  mooseName: {
    fontFamily: FONTS.display_bold,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  waveform: {
    height: 50,
  },
  spacer: {
    height: 20,
  },
  bottomPadding: {
    paddingVertical: 20,
  },
});

export default PracticeModeScreen;