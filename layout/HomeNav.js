import React from 'react';
import { View, Button } from 'react-native';

import PropTypes from 'prop-types';
import {
  SafeAreaView,
  createBottomTabNavigator,
  createDrawerNavigator,
  DrawerActions,
} from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { signOut } from '../utils/psaApi';
import Home from '../layout/Home';
import Header from '../components/header';
import Profile from '../layout/Profile';
import Documents from '../layout/DocumentStackNav';
import {
  removeMemberDataAsync,
  removeMemberBarcodeAsync,
} from '../utils/storageApi';

const TabNav = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
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
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `account${focused ? '' : '-outline'}`;
        } else if (routeName === 'Documents') {
          iconName = `file${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const LogoutButton = (props) => (
  <SafeAreaView
    forceInset={{ top: 'always', horizontal: 'never' }}
    style={{ flex: 1 }}
  >
    {/* <DrawerItems {...props} /> */}
    <Header text="Pages" />
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <View
        style={{ padding: 10, backgroundColor: 'white', flexDirection: 'row' }}
      >
        <Ionicons
          name="md-log-out"
          size={32}
          color="#000"
          style={{ marginRight: 10 }}
        />
        <Button
          title="Logout"
          color="black"
          onPress={() => {
            props.navigation.dispatch(DrawerActions.closeDrawer());
            signOut().then(() => {
              removeMemberDataAsync();
              removeMemberBarcodeAsync();
            });
            props.navigation.navigate('Login');
          }}
        />
      </View>
    </View>
  </SafeAreaView>
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
    TabNav: {
      screen: TabNav,
      headerMode: 'none',
    },
  },
  {
    contentComponent: (props) => <LogoutButton {...props} />,
    initialRouteName: 'TabNav',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

export default DrawerNav;
