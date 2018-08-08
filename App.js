import { createSwitchNavigator } from 'react-navigation';
import Login from './layout/Login';
import AuthLoading from './layout/AuthLoading';
import HomeNav from './layout/HomeNav';

const checkAuth = createSwitchNavigator(
  {
    AuthLoading,
    App: HomeNav,
    Login,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default checkAuth;
