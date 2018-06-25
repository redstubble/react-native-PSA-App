import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { Text, Button, StyleSheet, View, WebView } from 'react-native';
import PropTypes from 'prop-types';
import Head from '../components/headerSignedIn';
import { PROFILEPAGE } from '../utils/environment';

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

const Profile = ({ navigation, screenProps }) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
      <Head
        icon="menu"
        action={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="Profile Screen"
      />
      <WebView source={{ uri: PROFILEPAGE }} style={{ marginTop: 20 }} />
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
