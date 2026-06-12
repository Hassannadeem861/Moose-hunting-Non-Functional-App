import React, { useMemo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import colors from '../../utils/color';

const WaveformBar = ({ style, barColor = colors.primary[0], count = 40, isPlaying = false }) => {
  const bars = useMemo(() => {
    const generatedBars = [];
    for (let i = 0; i < count; i++) {
      const height = Math.random() * 60 + 20;
      generatedBars.push(height);
    }
    return generatedBars;
  }, [count]);

  const animatedValues = useRef(bars.map(() => new Animated.Value(1))).current;
  const animationRefs = useRef([]);

  useEffect(() => {
    if (isPlaying) {
      animationRefs.current = animatedValues.map((anim) => {
        const randomDuration = 300 + Math.random() * 400;
        const randomDelay = Math.random() * 300;
        const animation = Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 0.15,
              duration: randomDuration,
              delay: randomDelay,
              useNativeDriver: false,
            }),
            Animated.timing(anim, {
              toValue: 1,
              duration: randomDuration,
              useNativeDriver: false,
            }),
          ]),
        );
        animation.start();
        return animation;
      });
    } else {
      animationRefs.current.forEach(anim => anim?.stop());
      animatedValues.forEach(anim => {
        Animated.timing(anim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }).start();
      });
    }

    return () => {
      animationRefs.current.forEach(anim => anim?.stop());
    };
  }, [isPlaying]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.waveform}>
        {bars.map((height, index) => {
          const animatedHeight = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [`${height * 0.15}%`, `${height}%`],
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.bar,
                {
                  height: animatedHeight,
                  backgroundColor: barColor,
                  opacity: 0.3 + (height / 100) * 0.7,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    paddingHorizontal: 8,
    gap: 3,
  },
  bar: {
    width: 3,
    borderRadius: 2,
  },
});

export default WaveformBar;