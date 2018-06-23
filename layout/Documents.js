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
  };

  render({ navigation } = this.props) {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Documents Screen"
        />
        {!this.state.memberRequestCompleted ? (
          <ActivityIndicator />
        ) : (
          <Button
            onPress={() => {
              Linking.openURL(this.state.member.collective_agreements[0].path);
            }}
            title="PDF"
          />
          // <WebView
          //   source={{ uri: this.state.member.collective_agreements[0].path }}
          //   style={{ marginTop: 20 }}
          // />
        )}
      </SafeAreaView>
    );
  }
}
