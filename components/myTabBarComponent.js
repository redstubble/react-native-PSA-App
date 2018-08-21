import React from 'react';
import { View, Dimensions } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import Orientation from '../utils/orientation';

export default class myTabBarComponent extends React.PureComponent {
  state = { portraitOrientation: Orientation.isPortrait() === true };

  componentDidMount() {
    this.handleOrientation = () =>
    this.setState({
      portraitOrientation: Orientation.isPortrait() === true,
    });
    
    Dimensions.addEventListener('change', this.handleOrientation);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientation);
  }

  render() {
    return this.state.portraitOrientation ? (
      <BottomTabBar {...this.props} />
    ) : (
      <View />
    );
  }
}
