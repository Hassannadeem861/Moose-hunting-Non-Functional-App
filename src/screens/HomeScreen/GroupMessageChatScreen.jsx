import React, { useState, useRef } from 'react';
import {
  StyleSheet, View, Text, Image, TextInput,
  TouchableOpacity, FlatList, KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { fs, vh, vw } from '../../utils/responsive.js';

const BULL_IMG   = require('../../assets/MapScreen/bull.png');
const AVATAR_IMG = require('../../assets/MapScreen/bull.png'); // replace with avatar

const MOCK_MESSAGES = [
  { id: '0', type: 'image', image: BULL_IMG },
  { id: '1', type: 'text', sender: 'Michael Tran',   avatar: AVATAR_IMG, text: 'I dropped a pin where I heard a bull call 10 minutes ago.' },
  { id: '2', type: 'text', sender: 'Kristen Decastro', avatar: AVATAR_IMG, text: 'Moose might be close. Be ready.' },
];

const GroupMessageChatScreen = () => {
  const navigation = useNavigation();
  const { colors: themeColors } = useTheme();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatRef = useRef(null);

  // ── Dynamic Styles ──
  const dynamicStyles = StyleSheet.create({
    headerTitle: {
      color: themeColors.text,
    },
    senderName: {
      color: themeColors.text === colors.white ? colors.lightYellow : colors.secondary,
    },
    bubble: {
      backgroundColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    },
    bubbleText: {
      color: themeColors.text,
    },
    textInput: {
      backgroundColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      borderColor: themeColors.text === colors.white ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      color: themeColors.text,
      placeholderTextColor: themeColors.text === colors.white ? colors.textMuted : colors.description,
    },
    addBtn: {
      backgroundColor: colors.lightYellow,
    },
  });

  const sendMessage = () => {
    if (!inputText.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: String(Date.now()), type: 'text', sender: 'You', avatar: AVATAR_IMG, text: inputText.trim(), isMe: true },
    ]);
    setInputText('');
    setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }) => {
    if (item.type === 'image') {
      return (
        <View style={styles.chatImageWrap}>
          <Image source={item.image} style={styles.chatImage} resizeMode="cover" />
        </View>
      );
    }
    return (
      <View style={[styles.msgRow, item.isMe && styles.msgRowMe]}>
        {!item.isMe && (
          <Image source={item.avatar} style={styles.avatar} />
        )}
        <View style={styles.msgBubbleWrap}>
          {!item.isMe && <Text style={[styles.senderName, dynamicStyles.senderName]}>{item.sender}</Text>}
          <View style={[styles.bubble, dynamicStyles.bubble, item.isMe && styles.bubbleMe]}>
            <Text style={[styles.bubbleText, dynamicStyles.bubbleText]}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SettingsScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <MainHeader onBackPress={() => navigation.goBack()} containerStyle={styles.headerInner} />
          <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>Group Chat</Text>
          <TouchableOpacity style={styles.moreBtn}>
            <FontAwesome name="ellipsis-v" size={fs(16)} color={themeColors.text} />
          </TouchableOpacity>
        </View>

        {/* ── Messages ── */}
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />

        {/* ── Input Bar ── */}
        <SafeAreaView edges={['bottom']} style={styles.inputSafe}>
          <View style={styles.inputBar}>
            <TouchableOpacity style={[styles.addBtn, dynamicStyles.addBtn]} activeOpacity={0.8}>
              <FontAwesome name="plus" size={fs(16)} color={colors.black} />
            </TouchableOpacity>

            <TextInput
              style={[styles.textInput, dynamicStyles.textInput]}
              placeholder="Type here...."
              placeholderTextColor={dynamicStyles.textInput.placeholderTextColor}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />

            <TouchableOpacity style={styles.micBtn} activeOpacity={0.8} onPress={sendMessage}>
              <FontAwesome name="microphone" size={fs(16)} color={colors.lightYellow} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SettingsScreenWrapper>
  );
};

export default GroupMessageChatScreen;

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(4.3),
    paddingBottom: vh(1),
  },
  headerInner: {
    flex: 0,
    paddingVertical: 0,
  },
  headerTitle: {
    flex: 1,
    fontSize: fs(18),
    fontFamily: FONTS.display_bold,
    fontWeight: '700',
    textAlign: 'center',
  },
  moreBtn: {
    width: vw(8),
    alignItems: 'flex-end',
  },

  // Messages
  messagesList: {
    paddingHorizontal: vw(4),
    paddingBottom: vh(2),
  },
  chatImageWrap: {
    width: '70%',
    alignSelf: 'flex-start',
    marginBottom: vh(1.5),
    borderRadius: vw(3),
    overflow: 'hidden',
  },
  chatImage: {
    width: '100%',
    height: vh(22),
    borderRadius: vw(3),
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: vh(1.5),
  },
  msgRowMe: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    marginRight: vw(2),
    backgroundColor: colors.darkGreen,
  },
  msgBubbleWrap: {
    maxWidth: '75%',
  },
  senderName: {
    fontSize: fs(11),
    fontFamily: FONTS.display_medium,
    marginBottom: 3,
    marginLeft: 2,
  },
  bubble: {
    borderRadius: vw(3),
    paddingHorizontal: vw(3.5),
    paddingVertical: vh(1),
  },
  bubbleMe: {
    backgroundColor: colors.lightYellow,
  },
  bubbleText: {
    fontSize: fs(13),
    fontFamily: FONTS.display_regular,
    lineHeight: fs(19),
  },

  // Input Bar
  inputSafe: {
    backgroundColor: 'transparent',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(3),
    paddingVertical: vh(1.2),
    gap: vw(2.5),
  },
  addBtn: {
    width: vw(11),
    height: vw(11),
    borderRadius: vw(3),
    backgroundColor: colors.lightYellow,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  textInput: {
    flex: 1,
    borderRadius: vw(3),
    paddingHorizontal: vw(4),
    paddingVertical: vh(1.2),
    fontFamily: FONTS.display_regular,
    fontSize: fs(13),
    maxHeight: vh(12),
    borderWidth: 1,
  },
  micBtn: {
    width: vw(11),
    height: vw(11),
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
});