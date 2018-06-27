import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { PropTypes } from 'prop-types';
import Images from '../assets/images';
import Head from '../components/headerSignedIn';
import { getMemberDataAsync } from '../utils/storageApi';
import { FileSystem } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paragraph: {
    width: '100%',
    textAlign: 'center',
    // flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
});

class Home extends React.Component {
  state = {
    memberRequestCompleted: false,
    member: {
      first_name: '',
      surname: '',
      email: '',
      member_no: '',
      barcode_source: '',
      barcode_no: 0,
      barcode_img: '',
    },
  };
  componentDidMount() {
    this.populateMemberData();
  }

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    if (!member.valid) console.error('Member Data Invalid Error');
    else {
      console.log(await FileSystem.getInfoAsync(member.barcode_img));
      const q = await FileSystem.readAsStringAsync(member.barcode_img);
      debugger;
    }
    this.setState({
      member,
      memberRequestCompleted: true,
    });
  };

  render({ navigation } = this.props) {
    const w =
      'https://vignette.wikia.nocookie.net/fantendo/images/6/6e/Small-mario.png';
    console.log('This', this.state.member.barcode_img);
    const m = this.state.member;
    if (m.barcode_img) {
      const e = fetch(m.barcode_img).then((a) => {
        debugger;
        return null;
      });

      debugger;
    }

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
    // }
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
