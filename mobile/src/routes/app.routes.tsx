import { Platform } from 'react-native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';

import HomeSvg from '@assets/icons/home.svg';

import { useTheme } from 'native-base';

type AppRoutes = {
  home: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6] 

  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[200],
      tabBarInactiveTintColor: colors.gray[400],
      tabBarStyle: {
        backgroundColor: colors.gray[700],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: sizes[10], 
        paddingTop: sizes[7]
      }
    }}
    >
      <Screen 
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />
    </Navigator>
  );
}