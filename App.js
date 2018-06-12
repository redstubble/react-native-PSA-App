import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from './layout/Login';
import AuthLoadingScreen from './layout/AuthLoading';
import { psalightred } from './utils/colors';
import RootNav from './layout/RootNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: psalightred,
    justifyContent: 'center',
  },
});

const LoginScreen = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
    <Login onLoginPress={() => this.setState({ isLoggedIn: true })} />
  </SafeAreaView>
);

const AppStack = createStackNavigator({ Home: RootNav });
const AuthStack = createStackNavigator({ LogIn: LoginScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
