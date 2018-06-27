import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import PDFReader from 'rn-pdf-reader-js';

import {
  StyleSheet,
  WebView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { FileSystem } from 'expo';
import Head from '../components/headerSignedIn';
import { getMemberDataAsync } from '../utils/storageApi';

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
  state = {
    memberRequestCompleted: false,
    member: {},
  };

  componentDidMount() {
    this.populateMemberData();
  }

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    if (!member.valid) console.error('Member Data Invalid Error');
    this.setState({
      member,
      memberRequestCompleted: true,
    });
    const f = await FileSystem.getInfoAsync(t);
    console.log(t);
    debugger;
    // Linking.openURL(m);
  };

  render({ navigation } = this.props) {
    debugger;
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
    debugger;
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          icon="arrow-back"
          action={() => navigation.goBack()}
          title="Document Screen"
        />
        {!this.state.memberRequestCompleted ? <ActivityIndicator /> : pdfViewer}
      </SafeAreaView>
    );
  }
}
