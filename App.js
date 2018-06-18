import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from './layout/Login';
import AuthLoadingScreen from './layout/AuthLoading';
import HomeNav from './layout/HomeNav';

const HomeNavRef = createStackNavigator({ Home: HomeNav });

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
