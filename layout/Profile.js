import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

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

const Profile = (props) => {
  debugger;

  navigation.dispatch(DrawerActions.openDrawer());
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
      <Text style={styles.paragraph}>Profile Screen</Text>
      <Button
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
        title="Open drawer"
      />
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
