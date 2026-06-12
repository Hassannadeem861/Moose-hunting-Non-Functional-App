import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsScreenWrapper from '../../components/SettingsScreenWrapper.jsx';
import colors from '../../utils/color.js';
import { FONTS } from '../../utils/fonts.js';
import { vh } from '../../utils/responsive.js';
import MainHeader from '../../components/CustomHeader/CustomHeader.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';

// Hero image: a bull elk in the wild — loaded from Unsplash
const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?w=800&h=500&fit=crop';

// Avatar images
const MICHAEL_AVATAR =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face';
const KRISTEN_AVATAR =
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face';

const initialMessages = [
  {
    id: '1',
    type: 'image',
    imageUrl: HERO_IMAGE_URL,
  },
  {
    id: '2',
    type: 'incoming',
    author: 'Michael Tran',
    avatar: MICHAEL_AVATAR,
    text: 'I dropped a pin where I heard a bull call 10 minutes ago.',
  },
  {
    id: '3',
    type: 'incoming',
    author: 'Kristen Decastro',
    avatar: KRISTEN_AVATAR,
    text: 'Moose might be close. Be ready.',
  },
];

const GroupChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), type: 'outgoing', text: trimmed },
    ]);
    setInputText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SettingsScreenWrapper style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>

        <MainHeader
          style={styles.backBtn}
          activeOpacity={0.7}
        />

        <Text style={styles.headerTitle}>Group Chat</Text>


        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
          <View style={styles.menuDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {messages.map((msg) => {
            if (msg.type === 'image') {
              return (
                <Image
                  key={msg.id}
                  source={{ uri: msg.imageUrl }}
                  style={styles.heroImage}
                  resizeMode="cover"
                />
              );
            }

            if (msg.type === 'incoming') {
              return (
                <View key={msg.id} style={styles.incomingRow}>
                  <Image
                    source={{ uri: msg.avatar }}
                    style={styles.msgAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.bubbleIncoming}>
                    <Text style={styles.bubbleAuthor}>{msg.author}</Text>
                    <Text style={styles.bubbleText}>{msg.text}</Text>
                  </View>
                </View>
              );
            }

            if (msg.type === 'outgoing') {
              return (
                <View key={msg.id} style={styles.outgoingRow}>
                  <View style={styles.bubbleOutgoing}>
                    <Text style={styles.bubbleTextOutgoing}>{msg.text}</Text>
                  </View>
                </View>
              );
            }

            return null;
          })}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.plusBtn} activeOpacity={0.7}>
            <Text style={styles.plusIcon}>+</Text>
          </TouchableOpacity>

          <CustomInput
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            // icon="paper-plane"
            containerStyle={styles.messageInputContainer}
            inputContainerStyle={styles.messageInputContainerStyle}
            placeholderTextColor={colors.textHint}
          />
        </View>
      </KeyboardAvoidingView>
    </SettingsScreenWrapper>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingHorizontal: 0 },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.primary[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#091208',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 30,
    marginTop: -2,
  },
  headerTitle: {
    color: colors.white,
    fontFamily: FONTS.display_bold,
    fontSize: 18,
  },
  menuBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuDots: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.white,
  },

  /* ── Messages ── */
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  heroImage: {
    width: '100%',
    height: vh(28),
    borderRadius: 20,
    marginBottom: 20,
  },

  incomingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
    maxWidth: '80%',
  },
  msgAvatar: {
    width: 34,
    height: 34,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 2,
  },
  bubbleIncoming: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    padding: 14,
    flex: 1,
  },
  bubbleAuthor: {
    color: colors.primary[0],
    fontFamily: FONTS.display_bold,
    fontSize: 12,
    marginBottom: 6,
  },
  bubbleText: {
    color: colors.white,
    fontFamily: FONTS.display_regular,
    fontSize: 14,
    lineHeight: 20,
  },

  outgoingRow: {
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  bubbleOutgoing: {
    backgroundColor: 'rgba(255,223,0,0.18)',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    padding: 14,
    maxWidth: '80%',
  },
  bubbleTextOutgoing: {
    color: colors.white,
    fontFamily: FONTS.display_regular,
    fontSize: 14,
    lineHeight: 20,
  },

  /* ── Input bar ── */
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.08)',
    gap: 10,
  },
  plusBtn: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.primary[0],
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    color: '#091208',
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '700',
  },
  messageInputContainer: {
    flex: 1,
    marginVertical: 0,
  },
  messageInputContainerStyle: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    borderWidth: 0,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
  },
});