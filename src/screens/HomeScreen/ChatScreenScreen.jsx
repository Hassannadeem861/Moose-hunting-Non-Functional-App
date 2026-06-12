import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import CustomHeading from "../../components/CustomHeading/CustomHeading.jsx"
import CustomInput from "../../components/CustomInput/CustomInput.jsx"
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { vh } from '../../utils/responsive.js';
import Icon from 'react-native-vector-icons/FontAwesome';

const AVATAR_URL =
  'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=100&h=100&fit=crop&crop=face';

const chatItems = [
  { id: '1', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: 'Now', unread: true },
  { id: '2', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: 'Now', unread: true },
  { id: '3', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: '01:04 pm', unread: false },
  { id: '4', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: '02:54 pm', unread: false },
  { id: '5', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: '06:25 am', unread: false },
  { id: '6', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: 'yesterday', unread: false },
  { id: '7', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: 'yesterday', unread: false },
  { id: '8', title: 'Group Chat', message: 'Moose might be close. Be ready.', time: 'yesterday', unread: false },
];

const ChatItem = ({ item, onPress, dynamicStyles }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.75}
    style={[styles.chatItem, item.unread && styles.chatItemActive]}
  >
    <View style={[styles.avatarBox, item.unread && styles.avatarBoxActive]}>
      <Image
        source={{ uri: AVATAR_URL }}
        style={styles.avatarImage}
        resizeMode="cover"
      />
      {/* {item.unread && <View style={styles.onlineDot} />} */}
    </View>

    <View style={styles.chatTextGroup}>
      <Text
        style={[styles.chatTitle, dynamicStyles.chatTitle, item.unread && dynamicStyles.chatTitleActive]}
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text
        style={[styles.chatSubtitle, dynamicStyles.chatSubtitle, item.unread && dynamicStyles.chatSubtitleActive]}
        numberOfLines={1}
      >
        {item.message}
      </Text>
    </View>

    <View style={styles.chatMeta}>
      <Text style={[styles.chatTime, dynamicStyles.chatTime, item.unread && dynamicStyles.chatTimeActive]}>
        {item.time}
      </Text>
      {item.unread && <View style={styles.unreadBadge} />}
    </View>
  </TouchableOpacity>
);

const ChatScreen = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();

  // ── Dynamic Styles ──
  // Theme ke base par styles update hoti hain
  const dynamicStyles = StyleSheet.create({
    chatTitle: {
      color: themeColors.text,
    },
    chatSubtitle: {
      color: themeColors.text === colors.white ? colors.textHint : colors.description,
    },
    chatTime: {
      color: themeColors.text === colors.white ? colors.textHint : colors.description,
    },
    chatTitleActive: {
      color: themeColors.text === colors.white ? colors.white : colors.primary[0],
    },
    chatSubtitleActive: {
      color: themeColors.text === colors.white ? colors.lightYellow : colors.secondary,
    },
    chatTimeActive: {
      color: themeColors.text === colors.white ? colors.lightYellow : colors.secondary,
    },
    heading: {
      color: themeColors.text,
    },
  });

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <Text style={styles.pageTitle}>Messages</Text> */}
        <CustomHeading
          containerStyle={styles.textContainer}
          heading="Messages"
          color={dynamicStyles.heading.color}
          center={false}
          headingFontSize={28}
          headingFontFamily={FONTS.display_medium}
        />

        <CustomInput
          placeholder="Search"
          // icon="search"
          style={styles.customSearchInput}
          containerStyle={styles.customSearchContainer}
        />

        <View style={styles.chatRowList}>
          {chatItems.map((item) => (
            <ChatItem
              key={item.id}
              item={item}
              dynamicStyles={dynamicStyles}
              onPress={() => navigation.navigate('group_chat_screen')}
            />
          ))}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SettingsScreenWrapper>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingHorizontal: 16 },

  scrollContent: { paddingBottom: 40 },

  textContainer: {
    marginTop: vh(2.2),
    marginBottom: vh(2),
  },

  pageTitle: {
    marginTop: vh(2),
    color: colors.white,
    fontFamily: FONTS.display_bold,
    fontSize: 26,
    marginBottom: vh(2.5),
  },

  customSearchContainer: {
    marginBottom: vh(2),
  },
  customSearchInput: {
    // backgroundColor: 'red',
    borderRadius: 16,
    fontSize: 14,
  },

  chatRowList: { marginBottom: vh(2) },

  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
  },

  avatarBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: 'visible',
    marginRight: 12,
    position: 'relative',
  },
  avatarBoxActive: {},
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 16,
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1DB954',
    borderWidth: 2,
    borderColor: '#0a1a0d',
  },

  chatTextGroup: { flex: 1 },

  chatTitle: {
    fontFamily: FONTS.display_bold,
    fontSize: 15,
  },
  chatTitleActive: { color: colors.white },

  chatSubtitle: {
    fontFamily: FONTS.display_regular,
    marginTop: 3,
    fontSize: 13,
  },
  chatSubtitleActive: { color: colors.lightYellow },

  chatMeta: {
    alignItems: 'flex-end',
    marginLeft: 8,
    gap: 6,
  },
  chatTime: {
    fontSize: 11,
    fontFamily: FONTS.display_regular,
  },
  chatTimeActive: { color: colors.lightYellow },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightYellow,
    marginTop: 2,
  },
  bottomPadding: {
    paddingVertical: 30,
  },
});