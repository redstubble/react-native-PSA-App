import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import { PropTypes } from 'prop-types';
import Head from '../components/headerSignedIn';
import Images from '../assets/images';
import { getMemberDataAsync, getMemberBarcodeAsync } from '../utils/storageApi';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import DateTime from '../components/dateTime';
import { UserProp, UserValue } from '../style/Text';

const styles = StyleSheet.create({
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
    const barcode = await getMemberBarcodeAsync();
    if (!member.valid) console.error('Member Data Invalid Error');
    else console.log(barcode);
    this.setState({
      member,
      barcode,
      memberRequestCompleted: true,
    });
  };

  render({ navigation } = this.props) {
    const m = this.state.member;
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: backgroundWhite }]}>
        <Head
          icon="menu"
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Home"
        />
        {!this.state.memberRequestCompleted ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            style={{ backgroundColor: backgroundRed }}
            contentContainerStyle={{
              margin: 40,
              flex:1,
              justifyContent: 'center',
            }}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={Images.PSALogo}
                style={{
                  height: 65,
                  width: 1000,
                  aspectRatio: 1.5,
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              />
              </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
               <DateTime />
              <Text>
                <UserProp style={styles.paragraph}>Member No: </UserProp>
                <UserValue>{m.member_no}</UserValue>
              </Text>
              <Text>
                <UserProp style={styles.paragraph}>Name: </UserProp>
                <UserValue>{`${m.first_name} ${m.surname}`}</UserValue>
              </Text>
              </View>
              <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{backgroundColor: 'white', padding:20, paddingLeft:40, paddingRight:40}}>
              <Image
                source={{ uri: this.state.barcode }}
                style={{ height: 200, width: 280 }}
              />
              </View>
              <Text>
                <UserValue>{`${m.barcode_no}`}</UserValue>
              </Text>
            </View>
          </ScrollView>
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
