# Practice Mode Module - Implementation Guide

## Overview

The Practice Mode module has been fully implemented as per the design specifications. This module allows users to practice moose call techniques by:

1. Selecting from different moose species
2. Listening to reference audio
3. Recording their own attempts
4. Viewing and replaying recorded attempts
5. Deleting unsuccessful attempts

## Project Structure

### Created Files

#### Services
- **`src/services/AudioService.js`** - Handles all audio recording and playback operations
  - `requestMicrophonePermission()` - Request microphone access (Android/iOS)
  - `startRecording()` - Initialize and start recording
  - `stopRecording()` - Stop recording and return file path
  - `playAudio(filePath)` - Play audio from file path
  - `pauseAudio()` - Pause current audio playback
  - `stopAudio()` - Stop audio playback completely
  - `deleteRecording(filePath)` - Delete audio file from storage
  - `getAudioDuration(filePath)` - Get duration of audio file

- **`src/services/StorageService.js`** - Manages AsyncStorage for recording metadata
  - `getRecordings()` - Fetch all recordings
  - `saveRecording(recordingData)` - Save recording metadata
  - `deleteRecording(recordingId)` - Delete recording metadata
  - `getRecordingsByMoose(mooseId)` - Get recordings filtered by moose type
  - `clearAllRecordings()` - Clear all recordings

#### Components
- **`src/components/WaveformBar/WaveformBar.jsx`** - Visual waveform display
  - Generates animated waveform bars
  - Customizable colors and bar count
  - Used in audio cards and attempt cards

- **`src/components/AttemptCard/AttemptCard.jsx`** - Individual recording attempt display
  - Play/pause button for playback
  - Delete button with confirmation
  - Integrated waveform visualization
  - Audio state management

#### Screens
- **`src/screens/HomeScreen/PracticeModeScreen.jsx`** - Main practice mode screen
  - Lists 4 moose species (Alaska-Yukon, Northwestern, Eastern, Shiras)
  - Waveform preview for each species
  - Navigation to practice call screen on tap
  - Notification bell icon

- **`src/screens/HomeScreen/PracticeCallScreen.jsx`** - Individual practice call screen
  - Original moose audio playback
  - Recording controls (Start/Stop)
  - Timer display during recording
  - Recorded attempts list
  - Delete/replay functionality for attempts

#### Navigation
Updated `src/navigation/StackNavigation.jsx` to include:
- `practice_mode` - Route to PracticeModeScreen
- `practice_call` - Route to PracticeCallScreen

Updated `src/navigation/BottomRoutes.jsx` already includes:
- Practice Mode tab in bottom navigation

## Key Features

### 1. Practice Mode Screen
- **Moose Species List**: Displays 4 different moose types with visual waveforms
- **Responsive Cards**: Each species card shows name and waveform preview
- **Navigation**: Tapping a card navigates to the practice call screen with moose details

### 2. Practice Call Screen
- **Reference Audio**: Play/pause original moose call audio
- **Real-time Recording**: 
  - Start recording with permission handling
  - Recording timer display (MM:SS format)
  - Stop recording and automatic save
- **Attempt Management**:
  - Display all recorded attempts for the selected moose
  - Play/pause each attempt
  - Delete attempts with confirmation
  - Immediate UI updates on add/delete

### 3. Audio Persistence
- **AsyncStorage Integration**: 
  - Stores recording metadata only (not audio files)
  - Storage key: `PRACTICE_RECORDINGS`
  - Metadata includes: id, mooseId, mooseName, filePath, createdAt
- **File Management**: Audio files stored in device's document directory
- **Cross-Session Persistence**: Recordings persist across app restarts

## Component Architecture

### Class Components (No Hooks)
All components use class-based React patterns:
- `PracticeModeScreen` - Manages moose list rendering
- `PracticeCallScreen` - Manages recording and attempts
- `AttemptCard` - Manages individual attempt playback
- `WaveformBar` - Renders waveform visualization

### State Management
- **PracticeCallScreen**: Manages recording state, attempts list, playback state
- **AttemptCard**: Manages individual playback state
- **AudioService**: Singleton instance manages global audio state
- **StorageService**: Singleton instance manages persistent storage

## Dependencies

### Required Packages
```json
{
  "react-native-nitro-sound": "for audio recording/playback",
  "@react-native-async-storage/async-storage": "for local persistence",
  "react-native-vector-icons": "for icons (FontAwesome)",
  "react-native-fs": "for file system operations"
}
```

### Existing Dependencies Used
- `react-native` - UI components
- `react-navigation` - Navigation
- Custom components: `MainHeader`, `CustomButton`, `SettingsScreenWrapper`

## Usage

### Navigate to Practice Mode
```javascript
navigation.navigate('practice_mode');
```

### Start Practice Call
```javascript
navigation.navigate('practice_call', {
  mooseId: '1',
  mooseName: 'Alaska-Yukon Moose'
});
```

### Using AudioService
```javascript
import AudioService from '../../services/AudioService';

// Start recording
const recordingPath = await AudioService.startRecording();

// Stop recording
await AudioService.stopRecording();

// Play audio
await AudioService.playAudio(recordingPath);

// Pause playback
await AudioService.pauseAudio();
```

### Using StorageService
```javascript
import StorageService from '../../services/StorageService';

// Get all recordings
const recordings = await StorageService.getRecordings();

// Get recordings for specific moose
const mooseRecordings = await StorageService.getRecordingsByMoose('1');

// Save recording
const newRecording = await StorageService.saveRecording({
  mooseId: '1',
  mooseName: 'Alaska-Yukon Moose',
  filePath: '/path/to/recording.mp3',
  createdAt: new Date().toISOString()
});

// Delete recording
await StorageService.deleteRecording(recordingId);
```

## UI Design Details

### Colors
- **Primary**: `#FFDF00` (Yellow - buttons, icons)
- **Background**: Dark green theme
- **Cards**: `rgba(255,255,255,0.08)` for transparency
- **Text**: White for main content, secondary for descriptions

### Spacing
- Vertical height (`vh`) units used for responsive spacing
- Consistent 16px horizontal padding
- 12px margin between cards

### Typography
- Display Bold: Headers, titles
- Display Regular: Body text, labels
- Font sizes: 28px (titles), 16px (subtitles), 14px (body)

## File Paths

```
src/
├── services/
│   ├── AudioService.js
│   └── StorageService.js
├── components/
│   ├── WaveformBar/
│   │   └── WaveformBar.jsx
│   └── AttemptCard/
│       └── AttemptCard.jsx
├── screens/
│   └── HomeScreen/
│       ├── PracticeModeScreen.jsx
│       └── PracticeCallScreen.jsx
└── navigation/
    └── StackNavigation.jsx (updated)
```

## Error Handling

### Microphone Permission
- Requests permission on Android devices
- Graceful fallback on permission denial
- User-friendly alert messages

### Audio Operations
- Try-catch blocks for all audio operations
- Error logging for debugging
- Alert notifications for user feedback

### Storage Operations
- AsyncStorage error handling
- Fallback to empty arrays on error
- Consistent error logging

## Performance Considerations

1. **Audio Loading**: Efficient streaming/buffering with NitroSound
2. **Memory**: Singleton services prevent multiple instances
3. **UI Updates**: Immediate state updates for recording actions
4. **Storage**: Metadata-only storage reduces I/O operations
5. **Waveform**: Lightweight SVG-like rendering with React Native Views

## Testing Recommendations

1. Test microphone permission flow on both Android and iOS
2. Verify recording save/delete operations
3. Test audio playback with various audio file formats
4. Verify AsyncStorage persistence across app restarts
5. Test UI responsiveness with multiple attempts
6. Verify recording timer accuracy

## Future Enhancements

1. **Audio Analysis**: Add visualization of frequency spectrum
2. **Comparison**: Side-by-side waveform comparison with reference
3. **Scoring**: Implement call quality scoring algorithm
4. **Sharing**: Share attempts with community
5. **Editing**: Trim or crop recorded attempts
6. **Export**: Download recordings in different formats
7. **Social**: Compare with friend's recordings
8. **AI**: Implement ML-based feedback on call quality

## Troubleshooting

### Recording Not Starting
- Check microphone permissions in device settings
- Ensure AudioService is properly initialized
- Verify file path directory exists

### Playback Issues
- Check audio file format compatibility
- Verify file path is correct
- Ensure sufficient storage space

### AsyncStorage Not Persisting
- Verify AsyncStorage package is properly linked
- Check storage key naming consistency
- Clear AsyncStorage in development if needed

## Conclusion

The Practice Mode module is production-ready with full audio recording/playback, persistent storage, and a clean, intuitive UI matching the design specifications. All components use class-based patterns with proper error handling and user feedback mechanisms.
