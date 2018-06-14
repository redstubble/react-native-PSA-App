import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { Text, Button, Platform, StyleSheet, View } from 'react-native';
import { PropTypes } from 'prop-types';
import Head from '../components/headerSignedIn';

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
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
      <Head
        action={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="Home Screen"
      />
      <View style={styles.container}>
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
      </View>
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
