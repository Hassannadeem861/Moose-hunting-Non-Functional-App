import RNFS from 'react-native-fs';
import {PermissionsAndroid, Platform, Image} from 'react-native';
import audioRecorderPlayer from 'react-native-nitro-sound';

// ✅ Direct singleton use — no "new" constructor needed

const createAudioService = () => {
  let isRecording = false;
  let isPlaying = false;
  let currentRecordingPath = null;

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to record moose calls.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const startRecording = async (fileName = null) => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) throw new Error('Microphone permission denied');

      const timestamp = Date.now();
      const recordingFileName = fileName || `recording_${timestamp}.mp4`;
      const dir = Platform.OS === 'android' ? RNFS.CachesDirectoryPath : RNFS.DocumentDirectoryPath;
      currentRecordingPath = `${dir}/${recordingFileName}`;

      const uri = await audioRecorderPlayer.startRecorder(currentRecordingPath);
      audioRecorderPlayer.addRecordBackListener(() => {});

      isRecording = true;
      console.log('🎙 Recording started:', uri);
      return uri;
    } catch (error) {
      isRecording = false;
      console.error('startRecording error:', error);
      throw error;
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      isRecording = false;
      console.log('⏹ Recording stopped:', result);
      return result || currentRecordingPath;
    } catch (error) {
      isRecording = false;
      console.error('stopRecording error:', error);
      throw error;
    }
  };

  const playAudio = async (filePath, onFinished) => {
    try {
      await stopAudio();

      let uri;

      if (typeof filePath === 'number') {
        // require() bundled asset
        const asset = Image.resolveAssetSource(filePath);
        uri = asset.uri;
        console.log('🎵 Bundled asset resolved to:', uri);
      } else if (typeof filePath === 'string') {
        const cleanPath = filePath.replace('file://', '');
        const exists = await RNFS.exists(cleanPath);
        if (!exists) {
          console.error('❌ Audio file not found:', filePath);
          return false;
        }
        uri = Platform.OS === 'android' && !filePath.startsWith('file://') ? `file://${filePath}` : filePath;
      } else {
        console.error('❌ Invalid filePath type:', typeof filePath);
        return false;
      }

      await audioRecorderPlayer.startPlayer(uri);
      isPlaying = true;
      console.log('▶️  Playback started:', uri);

      audioRecorderPlayer.addPlayBackListener(e => {
        if (e.currentPosition > 0 && e.currentPosition >= e.duration) {
          isPlaying = false;
          audioRecorderPlayer.removePlayBackListener();
          onFinished && onFinished();
          console.log('✅ Playback finished');
        }
      });

      return true;
    } catch (error) {
      isPlaying = false;
      console.error('playAudio error:', error);
      throw error;
    }
  };

  const pauseAudio = async () => {
    try {
      await audioRecorderPlayer.pausePlayer();
      isPlaying = false;
      return true;
    } catch (error) {
      console.error('pauseAudio error:', error);
      throw error;
    }
  };

  const resumeAudio = async () => {
    try {
      await audioRecorderPlayer.resumePlayer();
      isPlaying = true;
      return true;
    } catch (error) {
      console.error('resumeAudio error:', error);
      throw error;
    }
  };

  const stopAudio = async () => {
    try {
      if (isPlaying) {
        await audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        isPlaying = false;
      }
      return true;
    } catch {
      isPlaying = false;
      return true;
    }
  };

  const deleteRecording = async filePath => {
    try {
      if (!filePath) return false;
      const path = filePath.replace('file://', '');
      const exists = await RNFS.exists(path);
      if (exists) {
        await RNFS.unlink(path);
        console.log('🗑 Deleted:', path);
        return true;
      }
      return false;
    } catch (error) {
      console.error('deleteRecording error:', error);
      throw error;
    }
  };

  const getIsRecording = () => isRecording;
  const getIsPlaying = () => isPlaying;
  const getCurrentRecordingPath = () => currentRecordingPath;
  const resetRecorder = () => { isRecording = false; currentRecordingPath = null; };

  return {
    requestMicrophonePermission,
    startRecording,
    stopRecording,
    playAudio,
    pauseAudio,
    resumeAudio,
    stopAudio,
    deleteRecording,
    getIsRecording,
    getIsPlaying,
    getCurrentRecordingPath,
    resetRecorder,
  };
};

export default createAudioService();