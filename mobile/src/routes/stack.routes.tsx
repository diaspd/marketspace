import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CreateAd } from '@screens/app/CreateAd';
import { EditAd } from '@screens/app/EditAd';
import { AdPreview } from '@screens/app/AdPreview';
import { AdDetails } from '@screens/app/AdDetails';

import { TabRoute } from './tab.routes';

type StackRoutes = {
  hometab: undefined;
  addetails: {
    id: string;
    profileImage?: string;
    ownerName?: string;
  };
  createad: undefined;
  editad: {
    title: string;
    description: string;
    price: string;
    images: any[];
    paymentMethod: string[];
    isNew: boolean;
    acceptTrade: boolean;
    id: string;
  };
  adpreview: {
    id?: string;
    title: string;
    description: string;
    price: string;
    images: any[];
    paymentMethod: string[];
    isNew: boolean;
    acceptTrade: boolean;
  };
}

const { Navigator, Screen } = createNativeStackNavigator<StackRoutes>();

export type AppStackNavigatorRoutesProps = NativeStackNavigationProp<StackRoutes>;

export function StackRoutes() {
  return (
    <Navigator>
      <Screen 
        name="hometab"
        component={TabRoute}
        options={{ headerShown: false }}
      />

      <Screen 
        name='createad'
        component={CreateAd}
        options={{ headerShown: false}}
      />

      <Screen 
        name='addetails'
        component={AdDetails}
        options={{ headerShown: false}}
      />


      <Screen 
        name='editad'
        component={EditAd}
        options={{ headerShown: false }}
      />

      <Screen 
        name='adpreview'
        component={AdPreview}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}