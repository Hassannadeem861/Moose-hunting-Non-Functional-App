import HomeScreen from '../screens/HomeScreen/HomeScreen.jsx';
import MapScreen from '../screens/HomeScreen/MapScreen.jsx';
import PracticeModeScreen from '../screens/HomeScreen/PracticeModeScreen.jsx';
import ChatScreen from '../screens/HomeScreen/ChatScreenScreen.jsx';
import SettingScreen from '../screens/HomeScreen/SettingsScreen.jsx';
import HomeIcons from '../utils/Homeicon.js';

export const BottomTabs = [
  {
    name: 'Home',
    component: HomeScreen,
    icon_outline: HomeIcons.HOME_OUTLINE,
    label: "Home",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Map',
    component: MapScreen,
    icon_outline: HomeIcons.MAP_OUTLINE,
    label: "Map",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Practice Mode',
    component: PracticeModeScreen,
    icon_outline: HomeIcons.CAMERA_OUTLINE,
    label: "Practice Mode",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Chat',
    component: ChatScreen,
    icon_outline: HomeIcons.MESSAGE_OUTLINE,
    label: "Chat",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
  {
    name: 'Settings',
    component: SettingScreen,
    icon_outline: HomeIcons.SETTING_OUTLINE,
    label: "Settings",
    authRequired: true,
    options: {
      headerShown: false,
      gestureEnabled: false
    },
  },
];
