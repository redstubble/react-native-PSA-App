import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { getMemberDataAsync } from '../utils/storageApi';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this.redirect();
  }

  redirect = async () => {
    const member = await getMemberDataAsync();
    this.props.navigation.navigate(member ? 'App' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoadingScreen;
