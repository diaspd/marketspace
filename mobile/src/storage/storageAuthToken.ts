import AsyncStorage from '@react-native-async-storage/async-storage';

import { AUTH_STORAGE } from '@storage/storageConfig';

type StorageAuthTokenProps = {
  token: string;
}

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(AUTH_STORAGE, token);
}

export async function storageGetAuthToken() {
  const token = await AsyncStorage.getItem(AUTH_STORAGE);

  return token;
}

export async function storageRemoveAuthToken() {
  await AsyncStorage.removeItem(AUTH_STORAGE);
}