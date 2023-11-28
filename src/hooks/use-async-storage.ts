/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageItem = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : data;
};

export const setItem = async (key: string, newValue: any) => {
  const stringifiedValue = JSON.stringify(newValue);
  await AsyncStorage.setItem(key, stringifiedValue);
};

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export default {
  getStorageItem,
  setItem,
  removeItem,
};
