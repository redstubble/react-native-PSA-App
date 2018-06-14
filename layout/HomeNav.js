import React from 'react';
import { View, Button } from 'react-native';
import PropTypes from 'prop-types';
import {
  SafeAreaView,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
  DrawerActions,
} from 'react-navigation';
import { signOut } from '../utils/psaApi';
import Home from '../layout/Home';
import Profile from '../layout/Profile';
import Documents from '../layout/Documents';
import { removeMemberAsync } from '../utils/storage';
import Header from '../components/headerSignedIn';

const TabNav = createBottomTabNavigator(
  {
    Home: {
      screen: (props) => <Home {...props} />,
      // path: '/home',
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Home',
      },
    },
    Profile: {
      screen: Profile,
      // path: '/profile',
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
      },
    },
    Documents: {
      screen: Documents,
      // path: '/documents',
      navigationOptions: {
        title: 'Documents',
        tabBarLabel: 'Documents',
      },
    },
  },
  {
    initialRouteName: 'Documents',
  },
);

const LogoutButton = (props) => (
  <View style={{ flex: 1 }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      {/* <DrawerItems {...props} /> */}
      <Button
        title="Logout"
        onPress={() => {
          props.navigation.dispatch(DrawerActions.closeDrawer());
          props.navigation.navigate('Auth');
          signOut().then(removeMemberAsync());
        }}
      />
    </SafeAreaView>
  </View>
);

LogoutButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

// TODO Better understanding of how to combine tabs
// at moment importing tabs and overriding with contentComponent
const DrawerNav = createDrawerNavigator(
  {
    Stack: {
      path: '/',
      screen: LogoutButton,
    },
  },
  {
    // contentComponent: (props) => <LogoutButton {...props} />,
    initialRouteName: 'Stack',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
);
//Change Order
const StckNav = createStackNavigator(
  {
    DrawerNav: {
      screen: DrawerNav,
      headerMode: 'none',
    },
    TabNav: {
      screen: TabNav,
      headerMode: 'none',
    },
  },
  {
    initialRouteName: 'TabNav',
  },
);

export default StckNav;
