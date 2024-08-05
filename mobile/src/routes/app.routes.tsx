import { Platform } from 'react-native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/app/Home';

import HomeSvg from '@assets/icons/home.svg';
import TagSvg from '@assets/icons/tag.svg';
import LogoutSvg from '@assets/icons/logout.svg';

import { useTheme } from 'native-base';
import { MyAds } from '@screens/app/MyAds';
import { AdDetails } from '@screens/app/AdDetails';

type AppRoutes = {
  home: undefined;
  myads: undefined;
  logout: undefined;
  addetails: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6] 

  const LogoutComponent = () => { return null }

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

      <Screen 
        name='myads'
        component={MyAds}
        options={{
          tabBarIcon: ({ color }) => (
            <TagSvg 
              fill={color} 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='logout'
        component={LogoutComponent}
        options={{
          tabBarIcon: () => (
            <LogoutSvg 
              width={iconSize} 
              height={iconSize}
            />
          )
        }}
      />

      <Screen 
        name='addetails'
        component={AdDetails}
        options={{ tabBarButton: () => null}}
      />
    </Navigator>
  );
}