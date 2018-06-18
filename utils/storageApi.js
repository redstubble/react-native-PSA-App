// @flow
import { AsyncStorage } from 'react-native';

export const MEMBER_KEY = 'PSAMember';

export const setMemberAsync = async (JSONdata) => {
  try {
    const result = await AsyncStorage.setItem(MEMBER_KEY, JSONdata);
    console.info('AsyncSet', result);
    return result;
  } catch (e) {
    console.log('AsyncSet', e.message);
    return false;
  }
};

export const getMemberAsync = async () => {
  try {
    const JSONdata = await AsyncStorage.getItem(MEMBER_KEY);
    if (JSONdata && JSON.parse(JSONdata)) {
      return JSON.parse(JSONdata);
    }
  } catch (e) {
    console.log('getMemberAsync', e.message);
  }
  return false;
};

export const removeMemberAsync = async () => {
  try {
    await AsyncStorage.removeItem(MEMBER_KEY);
    // const result = await AsyncStorage.getItem('PSAMember');
    // debugger;
  } catch (e) {
    console.log('Error', e.message);
  }
};
