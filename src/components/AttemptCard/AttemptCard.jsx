import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import colors from '../../utils/color';
import WaveformBar from '../WaveformBar/WaveformBar';
import AudioService from '../../services/AudioService';

const ICON_PLAY = require('../../assets/HomeScreen/play-btn.png');
const ICON_PAUSE = require('../../assets/HomeScreen/pause-btn.png');
const ICON_DELETE = require('../../assets/HomeScreen/delete.png');

const AttemptCard = ({ attempt, onDelete, onPlayStateChange }) => {
  const { dark } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)',
      borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(15, 23, 42, 0.08)',
      shadowColor: dark ? 'rgba(0,0,0,0.35)' : 'rgba(15, 23, 42, 0.10)',
    },
    playButton: {
      backgroundColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(15, 23, 42, 0.06)',
    },
    deleteButton: {
      backgroundColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(15, 23, 42, 0.06)',
    },
  });

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await AudioService.pauseAudio();
        setIsPlaying(false);
        if (onPlayStateChange) onPlayStateChange(false);
      } else {
        await AudioService.playAudio(attempt.filePath, () => {
          // Audio khatam hone pe auto reset
          setIsPlaying(false);
          if (onPlayStateChange) onPlayStateChange(false);
        });
        setIsPlaying(true);
        if (onPlayStateChange) onPlayStateChange(true);
      }
    } catch (error) {
      console.error('❌ Error playing recorded audio:', error);
      Alert.alert('Error', 'Failed to play audio');
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Attempt', 'Are you sure you want to delete this recording?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            if (onDelete) await onDelete(attempt.id);
          } catch (error) {
            Alert.alert('Error', 'Failed to delete recording');
          }
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <WaveformBar
        style={styles.waveform}
        barColor={colors.primary[0]}
        count={40}
        isPlaying={isPlaying}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.playButton, dynamicStyles.playButton]} onPress={handlePlayPause} activeOpacity={0.7}>
          <Image
            source={isPlaying ? ICON_PAUSE : ICON_PLAY}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.deleteButton, dynamicStyles.deleteButton]} onPress={handleDelete} activeOpacity={0.7}>
          <Image
            source={ICON_DELETE}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  waveform: {
    flex: 1,
    marginRight: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 18,
    height: 18,
  },
});

export default AttemptCard;