import { AsyncStorage } from 'react-native';

export const setMemberAsync = async (data) => {
  try {
    const result = await AsyncStorage.setItem(
      'PSAMember',
      JSON.stringify(data),
    );
    console.info('AsyncSet', result);
    return result;
  } catch (e) {
    console.log('AsyncSet', e.message);
    return false;
  }
};

export const getMemberAsync = async () => {
  try {
    const result = await AsyncStorage.getItem('PSAMember');
    const data = JSON.parse(result);
    console.info('AsyncGet', data);
    return data;
  } catch (e) {
    console.log('getMemberAsync', e.message);
    return false;
  }
};

export const removeMemberAsync = async () => {
  try {
    await AsyncStorage.removeItem('PSAMember');
    // const result = await AsyncStorage.getItem('PSAMember');
    // debugger;
  } catch (e) {
    console.log('Error', e.message);
  }
};
