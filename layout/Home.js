import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  Button,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { PropTypes } from 'prop-types';
import Head from '../components/headerSignedIn';
import { getMemberAsync } from '../utils/storageApi';

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

class Home extends React.Component {
  state = {
    memberDataRequestCompleted: 'false',
    member: {
      id: null,
      password: null, // todo, build token system
      first_name: null,
      surname: null,
      email: null,
      member_no: null,
      barcode_no: null,
      expiry: null,
      token: null,
      collective_agreements: [],
    },
  };
  componentDidMount() {
    this.populateMemberData();
  }

  populateMemberData = async () => {
    const data = await getMemberAsync();
    this.setState({
      member: {
        id: data.ID,
        password: data.Password, // todo, build token system
        first_name: data.FirstName,
        surname: data.Surname,
        email: data.Email,
        member_no: data.PSAMemberNumber,
        barcode_no: data.BarcodeNumber,
        expiry: data.Expiry,
        token: data.Token,
        collective_agreements: [],
      },
      memberDataRequestCompleted: true,
    });
  };

  render({ navigation } = this.props) {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Home Screen"
        />
        {!this.state.memberDataRequestCompleted ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.container}>
            <Text style={[styles.paragraph, { color: '#000' }]}>
              {JSON.stringify(this.state.member)}
            </Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
