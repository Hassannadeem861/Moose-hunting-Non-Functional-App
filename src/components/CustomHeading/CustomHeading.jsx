import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS } from '../../utils/fonts';
import colors from '../../utils/color';

const CustomHeading = ({
  heading = '',
  paragraph = '',
  color = colors.black,
  paragraphColor = colors.description,
  center = false,
  headingFontSize = 28,
  paragraphFontSize = 14,
  headingFontFamily = FONTS.display_medium,
  paragraphFontFamily = FONTS.display_regular,
  containerStyle,
  headingStyle,
  paragraphStyle,
}) => {
  const textAlign = center ? 'center' : 'left';
  const alignItems = center ? 'center' : 'flex-start';

  return (
    <View style={[styles.container, { alignItems }, containerStyle]}>
      {Boolean(heading) && (
        <Text
          style={[
            styles.heading,
            {
              color,
              fontSize: headingFontSize,
              fontFamily: headingFontFamily,
              textAlign,
            },
            headingStyle,
          ]}
        >
          {heading}
        </Text>
      )}

      {Boolean(paragraph) && (
        <Text
          style={[
            styles.paragraph,
            {
              color: paragraphColor,
              fontSize: paragraphFontSize,
              fontFamily: paragraphFontFamily,
              textAlign,
            },
            paragraphStyle,
          ]}
        >
          {paragraph}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  heading: {
    marginBottom: 8,
    fontWeight: '700',
  },
  paragraph: {
    lineHeight: 20,
  },
});

export default CustomHeading;
