import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Button } from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

// this.props.onLogoutPress();

const isAndroid = Platform.OS === 'android';

const Home = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#008B7D' }]}>
    <Text style={[styles.paragraph, { color: '#fff' }]}>Home Screen</Text>
    <Button
      title="Home Screen"
      onPress={() => navigation.navigate('Profile')}
      color={isAndroid ? 'blue' : '#fff'}
    />
  </SafeAreaView>
);

const Profile = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
    <Text style={styles.paragraph}>Profile Screen</Text>
    <Button title="Trade screen" onPress={() => navigation.navigate('Home')} />
  </SafeAreaView>
);

class Documents extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
        {/* <View> */}
        <Text>{JSON.stringify(this.state.contacts)}</Text>
        {/* </View> */}
        <Text style={[styles.paragraph, { color: '#fff' }]}>
          Documents Screen
        </Text>
      </SafeAreaView>
    );
  }
}

// export default Home;

export default createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      path: '/',
      navigationOptions: {
        title: 'Home',
        tabBarLabel: 'Home',
        // tabBarIcon: ({ tintColor, focused }) => (
        //   <Ionicons
        //     name={focused ? `${iconName}-analytics` : `${iconName}-trending-up`}
        //     size={26}
        //     style={{ color: tintColor }}
        //   />
        // ),
      },
    },
    Profile: {
      screen: Profile,
      path: '/',
      navigationOptions: {
        title: 'Profile',
        tabBarLabel: 'Profile',
        // tabBarIcon: ({ tintColor, focused }) => (
        //   <Ionicons
        //     name={
        //       focused
        //         ? `${iconName}-checkmark-circle`
        //         : `${iconName}-checkmark-circle-outline`
        //     }
        //     size={26}
        //     style={{ color: tintColor }}
        //   />
        // ),
      },
    },
    Documents: {
      screen: Documents,
      path: '/',
      navigationOptions: {
        title: 'Documents',
        tabBarLabel: 'Documents',
      },
    },
  },
  {
    navigationOptions: {
      tabBarOnPress: () => ({
        // StatusBar.setBarStyle('light-content');
        // isAndroid && StatusBar.setBackgroundColor('#6a51ae');
        // jumpToIndex(scene.index);
      }),
      InitialRouteName: 'Trade',
      headerMode: 'none',
    },
  },
);
