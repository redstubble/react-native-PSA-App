import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { getMemberAsync } from '../utils/storage';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.redirect(getMemberAsync());
  }

  redirect(auth) {
    this.props.navigation.navigate(auth ? 'App' : 'Auth', {
      auth,
    });
  }

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

export default AuthLoadingScreen;
