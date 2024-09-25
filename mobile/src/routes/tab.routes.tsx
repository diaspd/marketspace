import { Platform } from 'react-native';

import { useTheme } from 'native-base';

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '@hooks/useAuth';

import { SignIn } from '@screens/auth/SignIn';
import { MyAds } from '@screens/app/MyAds';
import { Home } from '@screens/app/Home';

import HomeSvg from '@assets/icons/home.svg';
import TagSvg from '@assets/icons/tag.svg';
import LogoutSvg from '@assets/icons/logout.svg';

type TabRoutes = {
  home: undefined;
  myads: undefined;
  logout: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<TabRoutes>();

export type AppTabNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>;

export function TabRoute() {
  const { sizes, colors } = useTheme();
  const { signOut } = useAuth();
  
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
        component={SignIn}
        options={{
          tabBarIcon: () => (
            <LogoutSvg 
              width={iconSize} 
              height={iconSize}
              onPress={signOut}
            />
          )
        }}
      />
    </Navigator>
  );
}