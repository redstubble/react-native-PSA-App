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
import Document from '../layout/Document';

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
    member: false,
  };

  componentDidMount() {
    this.populateMemberData();
  }

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    debugger;
    if (!member.valid) console.error('Member Data Invalid Error');
    this.setState({
      member,
      memberRequestCompleted: true,
    });
    debugger;
    const t = this.state.member.collective_agreements[0].path;
    console.log(t);
    const m = await Linking.canOpenURL(t);
    const f = await FileSystem.getInfoAsync(t);
  };

  render({ navigation } = this.props) {
    let agreements = null;
    if (this.state.memberRequestCompleted) {
      agreements = this.state.member.collective_agreements.map(
        (agreement, k) => (
          <Button
            title={agreement.name}
            key={k}
            onPress={() =>
              navigation.navigate('Agreement', { link: agreement.path })
            }
          >
            Remove
          </Button>
        ),
      );
    } else {
      agreements = <ActivityIndicator />;
    }
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          icon="menu"
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Documents Screen"
        />
        {agreements}
      </SafeAreaView>
    );
  }
}
