import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import WaveformBar from '../../components/WaveformBar/WaveformBar.jsx';
import AttemptCard from '../../components/AttemptCard/AttemptCard.jsx';
import AudioService from '../../services/AudioService.js';
import StorageService from '../../services/StorageService.js';
import {
  setIsRecording,
  incrementRecordingTime,
  resetRecordingTime,
  setRecordings,
  addRecording,
  deleteRecording,
  setLoading,
} from '../../redux/Slices/recordingSlice.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';
import { getAudioForMoose } from '../../utils/audioMap.js';

// ─── Assets ───────────────────────────────────────────────────────────────────
const BULL_IMG   = require('../../assets/HomeScreen/black-moose.png');
const ICON_PLAY  = require('../../assets/HomeScreen/play-btn.png');
const ICON_PAUSE = require('../../assets/HomeScreen/pause-btn.png');

// ─── Main Screen ──────────────────────────────────────────────────────────────
const PracticeCallScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch   = useDispatch();
  const { colors: themeColors, dark } = useTheme();
  const waveformBarColor = dark ? colors.primary[0] : colors.primary[0];

  const mooseId   = route.params?.mooseId   || '1';
  const mooseName = route.params?.mooseName || 'Moose';

  // ── Dynamic styles ────────────────────────────────────────────────────
  const dynamicStyles = StyleSheet.create({
    pageTitle: {
      color: themeColors.text,
    },
    cardTitle: {
      color: themeColors.text,
    },
    mooseImg: {
      tintColor: themeColors.text,
    },
    attemptsTitle: {
      color: themeColors.text,
    },
    recordingTime: {
      color: themeColors.text,
    },
    audioCard: {
      backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)',
      borderColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(15, 23, 42, 0.08)',
      shadowColor: dark ? 'rgba(0,0,0,0.35)' : 'rgba(15, 23, 42, 0.12)',
    },
    viewAllLink: {
      color: dark ? colors.primary[0] : colors.secondary,
    },
    // waveformBarColor: colors.primary[0],
  });

  // ── Redux state ──────────────────────────────────────────────────────────
  const { recordings, isRecording, recordingTime, isLoading } = useSelector(
    state => state.recording,
  );

  // ── Local play state (per screen, not global) ────────────────────────────
  const [isPlaying, setIsPlaying] = useState(false);

  const timerRef = useRef(null);

  // ── Load recordings from StorageService → Redux ───────────────────────────
  const loadRecordings = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const data = await StorageService.getRecordingsByMoose(mooseId);
      dispatch(setRecordings(data));
    } catch (err) {
      console.error('Load recordings error:', err);
      dispatch(setLoading(false));
    }
  }, [mooseId, dispatch]);

  useEffect(() => {
    loadRecordings();
    return () => {
      // cleanup on unmount
      if (timerRef.current) clearInterval(timerRef.current);
      AudioService.stopAudio?.();
    };
  }, [loadRecordings]);

  // ── Play / Pause moose audio ──────────────────────────────────────────────
  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await AudioService.pauseAudio();
        setIsPlaying(false);
      } else {
        const audio = getAudioForMoose(mooseId);
        if (!audio) {
          Alert.alert('Error', 'Audio not available for this moose');
          return;
        }
        await AudioService.playAudio(audio, () => {
          setIsPlaying(false); // auto reset when done
        });
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Audio error:', err);
      Alert.alert('Error', 'Failed to play audio');
      setIsPlaying(false);
    }
  };

  // ── Start recording ───────────────────────────────────────────────────────
  const handleRecordStart = async () => {
    try {
      const hasPermission = await AudioService.requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Microphone permission is required to record.');
        return;
      }
      await AudioService.startRecording();
      dispatch(setIsRecording(true));
      dispatch(resetRecordingTime());

      timerRef.current = setInterval(() => {
        dispatch(incrementRecordingTime());
      }, 1000);
    } catch (err) {
      console.error('Record start error:', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  // ── Stop recording → save to StorageService → Redux ──────────────────────
  const handleRecordStop = async () => {
    try {
      if (timerRef.current) clearInterval(timerRef.current);

      const recordingPath = await AudioService.stopRecording();
      dispatch(setIsRecording(false));
      dispatch(resetRecordingTime());

      // Save to StorageService (AsyncStorage under the hood)
      const newAttempt = await StorageService.saveRecording({
        mooseId,
        mooseName,
        filePath: recordingPath,
        createdAt: new Date().toISOString(),
      });

      // Add to Redux immediately — no need to reload
      dispatch(addRecording(newAttempt));
      Alert.alert('Success', 'Recording saved!');
    } catch (err) {
      console.error('Record stop error:', err);
      Alert.alert('Error', 'Failed to save recording');
    }
  };

  // ── Delete attempt ────────────────────────────────────────────────────────
 const handleDeleteAttempt = async (attemptId) => {
    try {
      const attempt = recordings.find(r => r.id === attemptId);
      await StorageService.deleteRecording(attemptId);
      if (attempt?.filePath) {
        await AudioService.deleteRecording?.(attempt.filePath);
      }
      dispatch(deleteRecording(attemptId));
    } catch (err) {
      console.error('Delete error:', err);
      Alert.alert('Error', 'Failed to delete recording');
    }
  };

  // ── Format mm:ss ──────────────────────────────────────────────────────────
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MainHeader onBackPress={() => navigation.goBack()} containerStyle={styles.header} />

        <Text style={[styles.pageTitle, dynamicStyles.pageTitle]}>Practice Call</Text>

        {/* ── Audio Card ── */}
        <View style={[styles.audioCard, dynamicStyles.audioCard]}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <Image source={BULL_IMG} style={[styles.mooseImg, dynamicStyles.mooseImg]} resizeMode="contain" />
            <Text style={[styles.cardTitle, dynamicStyles.cardTitle]}>{mooseName}</Text>
          </View>

          {/* Waveform */}
          <WaveformBar
            style={styles.waveform}
            barColor={waveformBarColor}
            count={45}
            isPlaying={isPlaying}
          />

          {/* Play / Pause — Image instead of FontAwesome */}
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayPause}
            activeOpacity={0.7}
          >
            <Image
              source={isPlaying ? ICON_PAUSE : ICON_PLAY}
              style={styles.playIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* ── Attempts Header ── */}
        {recordings.length > 0 && (
          <View style={styles.attemptsHeader}>
            <Text style={[styles.attemptsTitle, dynamicStyles.attemptsTitle]}>Your Attempts</Text>
            {recordings.length > 1 && (
              <TouchableOpacity onPress={() => navigation.navigate('attempt_history')}>
                <Text style={[styles.viewAllLink, dynamicStyles.viewAllLink]}>View All</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* ── Attempts List ── */}
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary[0]} style={styles.loader} />
        ) : (
          <View style={styles.attemptsContainer}>
            {recordings.map((attempt) => (
              <AttemptCard
                key={attempt.id}
                attempt={attempt}
                onDelete={handleDeleteAttempt}
                onPlayStateChange={(playing) => console.log('Attempt playing:', playing)}
              />
            ))}
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>

      {/* ── Record Button (fixed bottom) ── */}
      <View style={styles.recordingContainer}>
        {isRecording && (
          <View style={styles.recordingInfo}>
            <View style={styles.recordingIndicator} />
            <Text style={[styles.recordingTime, dynamicStyles.recordingTime]}>{formatTime(recordingTime)}</Text>
          </View>
        )}
        <CustomButton
          title={isRecording ? 'Stop Recording' : 'Record your own attempt'}
          onPress={isRecording ? handleRecordStop : handleRecordStart}
        />
      </View>
    </SettingsScreenWrapper>
  );
};

export default PracticeCallScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingHorizontal: 0 },
  scrollContent: { paddingHorizontal: vw(4.3), paddingBottom: 120 },
  header: { paddingHorizontal: 0 },
  pageTitle: {
    fontFamily: FONTS.display_bold,
    fontSize: fs(26),
    marginBottom: vh(2),
    marginTop: vh(1),
  },

  // Audio Card
  audioCard: {
    borderRadius: vw(4),
    padding: vw(4),
    marginBottom: vh(3),
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
    gap: vw(2.5),
  },
  mooseImg: {
    width: vw(9),
    height: vw(9),
  },
  cardTitle: {
    fontFamily: FONTS.display_bold,
    fontSize: fs(15),
  },
  waveform: { width: '100%', height: 70, marginBottom: vh(1.5) },
  playButton: {
    width: vw(14),
    height: vw(14),
    borderRadius: vw(7),
    // backgroundColor: colors.primary[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: vw(10),
    height: vw(10),
    // tintColor: colors.black,
  },

  // Attempts
  attemptsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh(2),
  },
  attemptsTitle: {
    fontFamily: FONTS.display_bold,
    fontSize: fs(15),
  },
  viewAllLink: {
    color: colors.primary[0],
    fontFamily: FONTS.display_regular,
    fontSize: fs(13),
  },
  attemptsContainer: { marginBottom: vh(2) },
  loader: { marginVertical: vh(2) },
  spacer: { height: 20 },

  // Record button (fixed bottom)
  recordingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: vw(4.3),
    paddingVertical: vh(2),
    paddingBottom: Platform.OS === 'ios' ? vh(4) : vh(2),
  },
  recordingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  recordingIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF0000',
    marginRight: 8,
  },
  recordingTime: {
    fontFamily: FONTS.display_bold,
    fontSize: fs(14),
  },
});