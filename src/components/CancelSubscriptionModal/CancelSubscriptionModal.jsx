import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import CustomButton from '../CustomButton/CustomButton.jsx';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const ICON_CROSS = require('../../assets/cross_icon.png');

const CancelSubscriptionModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* ── Overlay ── */}
      <View style={styles.overlay}>

        {/* ── Modal Box ── */}
        <View style={styles.box}>

          {/* Close button */}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.closeCircle}>
              <Image source={ICON_CROSS} style={styles.crossIcon} />
            </View>
          </TouchableOpacity>

          {/* Message */}
          <Text style={styles.message}>
            Are you sure you want to{'\n'}cancel your Subscription ?
          </Text>

          {/* Confirm Button */}
          <CustomButton
            title="Yes Cancel Subscription"
            onPress={onConfirm}
          />

        </View>
      </View>
    </Modal>
  );
};

export default CancelSubscriptionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: vw(8),
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: vw(6),
    paddingTop: vh(5),
    paddingBottom: vh(3),
    width: '100%',
    alignItems: 'center',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },

  // Close button top-right
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  closeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  crossIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: '#333',
  },

  // Message text
  message: {
    fontSize: fs(18),
    fontFamily: FONTS.display_bold,
    color: '#111',
    textAlign: 'center',
    lineHeight: fs(27),
    marginBottom: vh(3),
  },
});