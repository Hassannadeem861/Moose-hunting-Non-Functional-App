# Audio Playback Setup Instructions

## Issue Fixed
Audio playback was not working because:
1. ❌ Moose call audio was being passed as bundler reference (28) instead of file path
2. ❌ `AudioService.playAudio()` was just a stub with no actual playback implementation
3. ❌ `react-native-sound` library was not imported/used

## Solution Applied
✅ Updated `AudioService.js` to use `react-native-sound` library
✅ Now handles both:
  - **Moose call audio**: require() references (numbers) 
  - **Recorded audio**: File paths (strings)

## Required Installation

### Step 1: Install react-native-sound
Run this command in your project root:

```bash
npm install react-native-sound
# OR
yarn add react-native-sound
```

### Step 2: Link Native Module (if not using Expo)
If you're using React Native CLI (not Expo), run:

```bash
npx react-native link react-native-sound
```

### Step 3: Ensure Audio Files Exist
Make sure these files exist in `src/assets/audio/`:
- ✓ `moose.mp3` (Moose ID: 1)
- ✓ `moose1.mp3` (Moose ID: 2)
- ✓ `moose2.mp3` (Moose ID: 3 & 4)

## How It Works Now

### Moose Call Audio (from require())
1. User clicks play in PracticeCallScreen
2. `getAudioForMoose(mooseId)` returns require() reference (e.g., 28)
3. `AudioService.playAudio(28)` detects it's a number
4. Passes to `react-native-sound` which converts it to proper file path
5. Audio plays automatically

### Recorded Audio (from file path)
1. User records audio → saved to app's documents directory
2. `AudioService.playAudio('/data/user/.../recording.mp3')` detects it's a string
3. Verifies file exists using RNFS
4. Plays via `react-native-sound`

## Console Output

After installation, you should see logs like:

```
🎵 AUDIO PLAYBACK STARTING:
  - Input type: number
  - Input value: 28
  - Detected require() reference, passing to Sound library
  - ✓ Sound loaded successfully
  - Duration: 8.5 seconds
  - ✓ Audio playback finished
```

## Troubleshooting

### "Cannot find module 'react-native-sound'"
→ Run: `npm install react-native-sound`

### "undefined is not an object (evaluating 'new Sound')"
→ Library not properly linked, run: `npx react-native link react-native-sound`

### Audio plays but no sound comes out
→ Check your device volume settings
→ For iOS, check if app has audio category set (already done in code)
→ For Android, check microphone permissions in app settings

### Error loading sound: "error -1107"
→ File doesn't exist or path is invalid
→ Check console logs for actual file path being used

## Files Modified
- `src/services/AudioService.js` - Added Sound import and proper playback logic
- `src/utils/audioMap.js` - Added mooseId '4' mapping
- `src/screens/HomeScreen/PracticeCallScreen.jsx` - Enhanced debug logging
- `src/components/AttemptCard/AttemptCard.jsx` - Enhanced debug logging

## Testing

1. Open the app and navigate to Practice Mode
2. Click on any moose species
3. Click the play button
4. You should hear the moose call audio
5. Record your own attempt
6. Click play on your recorded attempt
7. You should hear your recording
