import React, { useEffect,useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomButton from '../../components/CustomButton/CustomButton.jsx';
import AttemptCard from '../../components/AttemptCard/AttemptCard.jsx';
import AudioService from '../../services/AudioService.js';
import StorageService from '../../services/StorageService.js';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { vh } from '../../utils/responsive.js';

const AttemptHistoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { colors: themeColors, dark } = useTheme();
  const mooseId = route.params?.mooseId || '1';
  const mooseName = route.params?.mooseName || 'Moose';

  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimer = useRef(null);

  const dynamicStyles = StyleSheet.create({
    pageTitle: { color: themeColors.text },
    subTitle: { color: dark ? colors.primary[0] : colors.secondary },
    emptyText: { color: themeColors.text },
    emptySubText: { color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(15, 23, 42, 0.55)' },
    recordingTime: { color: themeColors.text },
  });

  const loadAttempts = useCallback(async () => {
    try {
      setIsLoading(true);
      const loadedAttempts = await StorageService.getRecordingsByMoose(mooseId);
      setAttempts(loadedAttempts);
    } catch (error) {
      console.error('Error loading attempts:', error);
    } finally {
      setIsLoading(false);
    }
  }, [mooseId]);

useEffect(() => {
  loadAttempts();
}, [loadAttempts]);

useEffect(() => {
  return () => {
    if (recordingTimer.current) clearInterval(recordingTimer.current);
    AudioService.stopAudio();
  };
}, []);

  const handleDeleteAttempt = async (attemptId) => {
    try {
      const attemptToDelete = attempts.find((a) => a.id === attemptId);
      await StorageService.deleteRecording(attemptId);
      if (attemptToDelete) {
        await AudioService.deleteRecording(attemptToDelete.filePath);
      }
      setAttempts((prev) => prev.filter((a) => a.id !== attemptId));
    } catch (error) {
      console.error('Error deleting attempt:', error);
      Alert.alert('Error', 'Failed to delete recording');
    }
  };

  const handleRecordStart = async () => {
    try {
      const hasPermission = await AudioService.requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Microphone permission is required to record.');
        return;
      }
      await AudioService.startRecording();
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimer.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const handleRecordStop = async () => {
    try {
      if (recordingTimer.current) clearInterval(recordingTimer.current);
      const recordingPath = await AudioService.stopRecording();
      setIsRecording(false);
      setRecordingTime(0);

      const newAttempt = await StorageService.saveRecording({
        mooseId,
        mooseName,
        filePath: recordingPath,
        createdAt: new Date().toISOString(),
      });

      setAttempts((prev) => [newAttempt, ...prev]);
      Alert.alert('Success', 'Recording saved!');
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Failed to save recording');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎙️</Text>
      <Text style={[styles.emptyText, dynamicStyles.emptyText]}>No recordings yet</Text>
      <Text style={[styles.emptySubText, dynamicStyles.emptySubText]}>Record your first attempt below!</Text>
    </View>
  );

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <MainHeader
          onBackPress={() => navigation.goBack()}
          containerStyle={styles.header}
        />
        <Text style={[styles.pageTitle, dynamicStyles.pageTitle]}>Your Attempt's</Text>
        <Text style={[styles.subTitle, dynamicStyles.subTitle]}>{mooseName}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary[0]} style={styles.loader} />
      ) : (
        <FlatList
          data={attempts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            attempts.length === 0 && styles.listContentEmpty,
          ]}
          ListEmptyComponent={renderEmpty}
          renderItem={({ item }) => (
            <AttemptCard
              attempt={item}
              onDelete={handleDeleteAttempt}
              onPlayStateChange={(playing) => {
                if (playing) AudioService.stopAudio();
              }}
            />
          )}
        />
      )}

      {/* Bottom recording bar — same as PracticeCallScreen */}
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
          disabled={false}
        />
      </View>
    </SettingsScreenWrapper>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginBottom: vh(2),
  },
  header: {
    paddingHorizontal: 0,
  },
  pageTitle: {
    fontFamily: FONTS.display_bold,
    fontSize: 28,
    marginTop: vh(1),
  },
  subTitle: {
    fontFamily: FONTS.display_regular,
    fontSize: 13,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 120,
  },
  listContentEmpty: {
    flex: 1,
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: vh(10),
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontFamily: FONTS.display_bold,
    fontSize: 18,
    marginBottom: 6,
  },
  emptySubText: {
    fontFamily: FONTS.display_regular,
    fontSize: 13,
    textAlign: 'center',
  },
  recordingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // paddingHorizontal: 13,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
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
    fontSize: 14,
  },
});

export default AttemptHistoryScreen;