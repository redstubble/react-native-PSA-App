import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import PDFReader from 'rn-pdf-reader-js';
import { StyleSheet, View, WebView, ActivityIndicator, Platform } from 'react-native';
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

export default class Document extends Component {
  render({ navigation } = this.props) {
    console.log(this.props.navigation.getParam('link'));

    const pdfViewer =
      Platform.OS === 'ios' ? (
        <WebView
          source={{ uri: this.props.navigation.getParam('link') }} //'https://google.com'
          style={{ marginTop: 20 }}
        />
      ) : (
        <PDFReader
          source={{
            uri: this.props.navigation.getParam('link'),
          }}
        />
      );
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          icon="arrow-back"
          action={() => navigation.goBack()}
          title="Document Screen"
        />
        {pdfViewer}
      </SafeAreaView>
    );
  }
}
