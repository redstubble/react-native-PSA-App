import styled from 'styled-components';
import { Platform, Dimensions } from 'react-native';
import { textWhite } from '../utils/colors';

export const CustomSafeAreaView = styled.SafeAreaView`
  background-color: #000;
  padding-top: ${Platform.OS === 'android' ? 25 : 0};
  height: ${Dimensions.get('screen').height};
`;

export const HeaderText = styled.Text`
  font-size: 20;
  color: ${textWhite};
  align-items: center;
  text-align: left;
`;

export const UserProp = styled.Text`
  font-size: 14;
  color: ${textWhite};
  align-items: center;
  text-align: left;
  font-weight: bold;
`;

export const UserValue = styled.Text`
  font-size: 14;
  color: ${textWhite};
  align-items: center;
  text-align: left;
`;
