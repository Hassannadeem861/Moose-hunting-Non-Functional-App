import AsyncStorage from '@react-native-async-storage/async-storage';

const PRACTICE_RECORDINGS_KEY = 'PRACTICE_RECORDINGS';

// Create StorageService as a functional singleton
const createStorageService = () => {
  const getRecordings = async () => {
    try {
      const data = await AsyncStorage.getItem(PRACTICE_RECORDINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching recordings:', error);
      return [];
    }
  };

  const saveRecording = async (recordingData) => {
    try {
      const recordings = await getRecordings();

      const newRecording = {
        id: recordingData.id || `recording_${Date.now()}`,
        mooseId: recordingData.mooseId,
        mooseName: recordingData.mooseName,
        filePath: recordingData.filePath,
        createdAt: recordingData.createdAt || new Date().toISOString(),
      };

      recordings.push(newRecording);
      await AsyncStorage.setItem(PRACTICE_RECORDINGS_KEY, JSON.stringify(recordings));

      return newRecording;
    } catch (error) {
      console.error('Error saving recording:', error);
      throw error;
    }
  };

  const deleteRecording = async (recordingId) => {
    try {
      let recordings = await getRecordings();
      recordings = recordings.filter((rec) => rec.id !== recordingId);
      await AsyncStorage.setItem(PRACTICE_RECORDINGS_KEY, JSON.stringify(recordings));
      return true;
    } catch (error) {
      console.error('Error deleting recording:', error);
      throw error;
    }
  };

  const getRecordingsByMoose = async (mooseId) => {
    try {
      const recordings = await getRecordings();
      return recordings.filter((rec) => rec.mooseId === mooseId);
    } catch (error) {
      console.error('Error fetching recordings by moose:', error);
      return [];
    }
  };

  const clearAllRecordings = async () => {
    try {
      await AsyncStorage.removeItem(PRACTICE_RECORDINGS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing recordings:', error);
      throw error;
    }
  };

  return {
    getRecordings,
    saveRecording,
    deleteRecording,
    getRecordingsByMoose,
    clearAllRecordings,
  };
};

export default createStorageService();
