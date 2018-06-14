import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Login from './layout/Login';
import AuthLoadingScreen from './layout/AuthLoading';
import HomeNav from './layout/HomeNav';

const HomeNavRef = createStackNavigator({ Home: HomeNav });

const LoginScreen = () => <Login />;
const LoginNav = createStackNavigator({ LogIn: LoginScreen });

const checkAuth = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: HomeNavRef,
    Auth: LoginNav,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default checkAuth;
