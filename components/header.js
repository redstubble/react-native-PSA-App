import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
        backgroundColor: '#D01E1E',
        alignSelf: 'stretch',
        padding: 20,
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 5,
        },
      }}
    >
      <HeaderText>{text}</HeaderText>
      <View style={{}} />
    </View>
  );
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
