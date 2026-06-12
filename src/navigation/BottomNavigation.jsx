import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { BottomTabs } from './BottomRoutes.jsx';
import Color from '../utils/color.js';
import colors from '../utils/color.js';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ icon_fill, icon_outline, label, focused, activeTint, inactiveTint }) => {
  const { dark } = useTheme();
  const isDarkTheme = Boolean(dark);

  return (
    <View style={[styles.tabItemContent, { width: width * 0.2 }]}>
      {/* Top indicator line */}
      <View style={{
        height: 4,
        width: 35,
        borderRadius: 2,
        backgroundColor: focused ? activeTint : 'transparent',
        position: 'absolute',
        bottom: 45,
        opacity: isDarkTheme ? 1 : 0.95,
      }} />
      <View style={styles.iconWrapper}>
        <Image
          source={focused ? icon_outline : icon_outline}
          style={[
            styles.tabIcon,
            {
              tintColor: focused ? activeTint : inactiveTint,
            },
          ]}
          resizeMode="contain"
        />
      </View>
      <Text
        numberOfLines={2}
        style={[
          styles.label,
          { color: focused ? activeTint : inactiveTint },
        ]}
        allowFontScaling={false}
      >
        {label}
      </Text>
    </View>
  );
};

const BottomNavigation = () => {
  const { dark, colors: themeColors } = useTheme();
  const isDarkTheme = Boolean(dark);

  const activeTint = isDarkTheme ? (themeColors.primary || Color.lightYellow) : '#1F1F1F';
  const inactiveTint = isDarkTheme ? 'rgba(255,255,255,0.55)' : '#111111';

  return (
    <Tab.Navigator
      screenOptions={
        {
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: isDarkTheme ? colors.bottomSheetBackground : '#F4F4F4',
              borderColor: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            },
          ],
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          lazy: false,
          tabBarPressColor: 'transparent',
          tabBarPressOpacity: 1,
          tabBarActiveBackgroundColor: 'transparent',
          tabBarInactiveBackgroundColor: 'transparent',
          tabBarIndicatorStyle: { height: 0 },
        }
      }
    >
      {BottomTabs?.map((screen, index) => (
        <Tab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
                style={[props.style, { backgroundColor: 'transparent' }]}
              />
            ),
            tabBarIcon: ({ focused }) => {
              return (
                <CustomTabBarIcon
                  // icon_fill={screen.icon_fill}
                  icon_outline={screen.icon_outline}
                  label={screen.label}
                  focused={focused}
                  activeTint={activeTint}
                  inactiveTint={inactiveTint}
                />
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation

const styles = StyleSheet.create({

  tabBar: {
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: 'blue',
    // borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bottomSheetBackground,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // shadowColor: Color.WHITE,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.65,
    elevation: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  tabItemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    maxWidth: 100,
    gap: 5,
    marginBottom: 20,
    paddingHorizontal: 12,
  },

  iconWrapper: {
    height: 30,
    width: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabIcon: {
    width: 32,
    height: 32,
  },

  label: {
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 10,
  },

});