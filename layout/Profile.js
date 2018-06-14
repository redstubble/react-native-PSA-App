import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { Text, Button, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Head from '../components/headerSignedIn';

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
        action={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="Profile Screen"
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>Profile Screen</Text>
        <Button
          onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
          title="Open drawer"
        />
      </View>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
