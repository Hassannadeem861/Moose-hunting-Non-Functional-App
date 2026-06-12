import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import backBtn from '../../assets/backBtn.png';
import { useNavigation } from '@react-navigation/native';

const MainHeader = ({ isbackbtnshow = true, onBackPress, containerStyle }) => {
  const navigation = useNavigation();
  return (
    <View
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
      }, containerStyle]}
    >
      {isbackbtnshow ? (
        <TouchableOpacity
          onPress={() => {
            if (typeof onBackPress === 'function') {
              onBackPress();
              return;
            }
            navigation.goBack();
          }}
        >
          <Image source={backBtn} style={styles.backBtn} resizeMode="contain" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtn} />
      )}
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  rightPlaceholder: {
    width: 24,
    height: 24,
  },
});

export default MainHeader;
