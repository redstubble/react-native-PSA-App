import React, { Component } from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import PDFReader from 'rn-pdf-reader-js';

import {
  Text,
  StyleSheet,
  View,
  Button,
  WebView,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import { FileSystem, DocumentPicker } from 'expo';
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
    const t = this.state.member.collective_agreements[0].path;
    console.log(t);
    const m = await Linking.canOpenURL(t);
    const f = await FileSystem.getInfoAsync(t);
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
