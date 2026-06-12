import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';


const CardInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  secureTextEntry = false,
  error,
  style,
  inputStyle,
}) => (
  <View style={[styles.wrapper, style]}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <View style={[styles.inputBox, error && styles.inputBoxError]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

export default CardInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginBottom: 8,
  },
  inputBox: {
    borderWidth: 1.2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    backgroundColor: '#fff',
  },
  inputBoxError: {
    borderColor: '#ef4444',
  },
  input: {
    fontSize: 15,
    color: '#111',
    padding: 0,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#ef4444',
  },
});
