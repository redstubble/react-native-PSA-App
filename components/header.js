import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderText = styled.Text`
  font-size: 20;
  color: #fff;
  align-items: center;
  text-align: left;
`;

const HeaderView = styled.View`
  background-color: #d01e1e;
  align-self: stretch;
  padding: 20px;
  box-shadow: 20px 5px 20px #000;
  /* shadow-offset: { width: 0, height: 5px}; */
  /* shadow-opacity: 0.25; */
  /* shadow-radius: 3;
  shadow-color: #000; */
`;

const HeaderViewAndroid = HeaderView.extend`
  padding-top: 40px;
`;

class Header extends React.Component {
  renderView = (content) => {
    if (Platform.OS === 'ios') return <HeaderView>{content}</HeaderView>;
    return <HeaderViewAndroid>{content}</HeaderViewAndroid>;
  };

  render({ text } = this.props) {
    const content = <HeaderText>{text}</HeaderText>;
    return this.renderView(content);
  }
}

export default Header;

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
