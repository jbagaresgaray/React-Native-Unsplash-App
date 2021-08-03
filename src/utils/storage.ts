import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  set(key: string, val: any) {
    return AsyncStorage.setItem(key, JSON.stringify(val));
  },
  remove(key: string) {
    return AsyncStorage.removeItem(key);
  },
  async get(key: string) {
    try {
      const json: any = await AsyncStorage.getItem(key);
      return JSON.parse(json);
    } catch {
      return null;
    }
  },
};
