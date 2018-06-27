import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { PropTypes } from 'prop-types';
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

class Home extends React.Component {
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
    const m = this.state.member;
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          icon="menu"
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Home Screen"
        />
        {!this.state.memberRequestCompleted ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.container}>
            <Text style={styles.paragraph}>
              Name: {`${m.first_name} ${m.surname}`}
            </Text>
            <Text style={styles.paragraph}>Email: {m.email}</Text>
            <Text style={styles.paragraph}>Member No: {m.member_no}</Text>
            <Text style={styles.paragraph}>Barcode: {m.barcode_no}</Text>
            <Text style={styles.paragraph}>Barcode: {m.barcode_img}</Text>
            <Image
              style={{
                height: 65,
                width: 1000,
                aspectRatio: 1.5,
                resizeMode: 'contain',
              }}
              source={{
                // uri: w,
                uri: m.barcode_source,
              }}
            />
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
