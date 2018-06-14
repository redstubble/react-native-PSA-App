import React, { Component } from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { Text, StyleSheet, View } from 'react-native';
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

export default class Documents extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render({ navigation } = this.props) {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#6a51ae' }]}>
        <Head
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Documents"
        />
        <View style={styles.container}>
          <Text>Docs</Text>

          <Text style={[styles.paragraph, { color: '#fff' }]}>
            Documents Screen
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
