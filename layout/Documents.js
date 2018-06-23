import React, { Component } from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  StyleSheet,
  View,
  Button,
  WebView,
  ActivityIndicator,
  Linking,
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

export default class Documents extends Component {
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
    // Linking.openURL(m);
  };

  render({ navigation } = this.props) {
    // DocumentPicker.getDocumentAsync(options)
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Documents Screen"
        />
        {!this.state.memberRequestCompleted ? (
          <ActivityIndicator />
        ) : (
          <WebView
            source={{ uri: this.state.member.collective_agreements[0].path }} //'https://google.com'
            style={{ marginTop: 20 }}
          />
        )}
      </SafeAreaView>
    );
  }
}
