import { Platform } from 'react-native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/app/Home';

import HomeSvg from '@assets/icons/home.svg';
import TagSvg from '@assets/icons/tag.svg';
import LogoutSvg from '@assets/icons/logout.svg';

import { useTheme } from 'native-base';
import { MyAds } from '@screens/app/MyAds';
import { AdDetails } from '@screens/app/AdDetails';
import { CreateAd } from '@screens/app/CreateAd';
import { EditAd } from '@screens/app/EditAd';
import { AdPreview } from '@screens/app/AdPreview';
import { useAuth } from '@hooks/useAuth';
import { SignIn } from '@screens/auth/SignIn';

type AppRoutes = {
  home: undefined;
  myads: undefined;
  logout: undefined;
  addetails: {
    id: string;
  };
  createad: undefined;
  editad: {
    title: string;
    description: string;
    price: string;
    images: any[];
    paymentMethods: string[];
    isNew: boolean;
    acceptTrade: boolean;
    id: string;
  };
  adpreview: {
    title: string;
    description: string;
    price: string;
    images: any[];
    paymentMethod: string[];
    isNew: boolean;
    acceptTrade: boolean;
  };
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const { signOut } = useAuth()

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

      <Screen 
        name='addetails'
        component={AdDetails}
        options={{ tabBarButton: () => null}}
      />

      <Screen 
        name='createad'
        component={CreateAd}
        options={{ tabBarButton: () => null}}
      />

      <Screen 
        name='editad'
        component={EditAd}
        options={{ tabBarButton: () => null}}
      />

      <Screen 
        name='adpreview'
        component={AdPreview}
        options={{ tabBarButton: () => null}}
      />
    </Navigator>
  );
}