import React, { Component } from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  StyleSheet,
  Button,
  ActivityIndicator,
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
    const f = await FileSystem.getInfoAsync(t);
    console.log(f);
  };

  render({ navigation } = this.props) {
    let agreements = null;
    if (this.state.memberRequestCompleted) {
      agreements = this.state.member.collective_agreements.map(
        (agreement) => (
          <Button
            title={agreement.name}
            key={agreement.path}
            onPress={() =>
              navigation.navigate('Agreement', { link: agreement.path })
            }
          >
            Remove
          </Button>
        ));
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
