import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';
import { fs, vw, vh } from '../../utils/responsive';


const CustomButton = ({
  title,
  onPress,
  disabled = false,
  style,
  variant = 'primary',
  backgroundColor = null,
  textColor,
}) => {
  const { dark } = useTheme();
  const isDarkTheme = Boolean(dark);

  // ── OUTLINE button ─────────────────────────────────────────────────
  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={[
          styles.base,
          styles.outlineBtn,
          disabled && styles.disabledOutline,
          style,
        ]}
      >
        <Text style={[styles.btnText, { color: textColor || colors.white }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // ── SOLID color button ─────────────────────────────────────────────
  if (variant === 'solid' || backgroundColor) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={[
          styles.base,
          styles.solidBtn,
          { backgroundColor: disabled ? colors.gray : (backgroundColor || colors.secondary) },
          style,
        ]}
      >
        <Text style={[styles.btnText, { color: textColor || colors.white }]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // ── PRIMARY gradient button (default) ─────────────────────────────
  const darkGradientColors = ['#FFDF00', '#F6D108', '#EDC211', '#E3B419', '#DAA521'];
  const lightGradientColors = ['#F9D084', '#F0C76F'];

  const primaryColors = disabled
    ? [colors.gray, colors.gray]
    : isDarkTheme
      ? darkGradientColors
      : lightGradientColors;

  return (
    <LinearGradient
      colors={primaryColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.base, style]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={styles.gradientInner}
      >
        <Text style={[styles.btnText, { color: textColor || (isDarkTheme ? colors.black : '#2D2D2D') }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  base: {
    borderRadius: vw(4),
    width: '100%',
    overflow: 'hidden',
  },
  gradientInner: {
    paddingVertical: vh(2.5),
    alignItems: 'center',
    width: '100%',
  },
  outlineBtn: {
    paddingVertical: vh(2.5),
    alignItems: 'center',
    backgroundColor: colors.bottomSheetBackground,    
    borderWidth: 0.5,
    borderColor: colors.black,    
  },
  disabledOutline: {
    opacity: 0.5,
  },
  solidBtn: {
    paddingVertical: vh(3),
    alignItems: 'center',
  },
  btnText: {
    fontSize: fs(14),
    fontFamily: FONTS.display_medium,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});