const AUDIO_MAP = {
  '1': require('../assets/audio/moose.mp3'),
  '2': require('../assets/audio/moose1.mp3'),
  '3': require('../assets/audio/moose2.mp3'),
  '4': require('../assets/audio/moose2.mp3'),
};

// Get audio file for a specific moose species
export const getAudioForMoose = (mooseId) => {
  return AUDIO_MAP[mooseId] || null;
};

// Get all available audio files
export const getAllAudioFiles = () => {
  return AUDIO_MAP;
};

// Check if audio is available for a moose species
export const isAudioAvailable = (mooseId) => {
  return AUDIO_MAP[mooseId] !== undefined;
};

export default AUDIO_MAP;
