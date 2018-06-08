import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { red } from '../utils/colors';

const HeaderText = styled.Text`
  font-size: 20;
  color: #fff;
  align-items: center;
  text-align: left;
`;

export default function Header({ text }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: red,
        alignSelf: 'stretch',
        padding: 20,
      }}
    >
      <HeaderText>{text}</HeaderText>
    </View>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
