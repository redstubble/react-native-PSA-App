import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Text, StyleSheet } from 'react-native';

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

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
        {/* <View> */}
        <Text>Docs</Text>
        {/* </View> */}
        <Text style={[styles.paragraph, { color: '#fff' }]}>
          Documents Screen
        </Text>
      </SafeAreaView>
    );
  }
}
