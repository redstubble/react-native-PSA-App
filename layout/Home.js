import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { Text, Button, Platform, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';

const isAndroid = Platform.OS === 'android';

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

const Home = ({ navigation }) => {
  debugger;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#008B7D' }]}>
      <Text style={[styles.paragraph, { color: '#fff' }]}>Home Screen</Text>

      <Button
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="Open drawer"
      />
      <Button
        title="Home Screen"
        onPress={() => navigation.navigate('Profile')}
        color={isAndroid ? 'blue' : '#fff'}
      />
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
