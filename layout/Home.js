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
import { Font } from 'expo';
import Head from '../components/headerSignedIn';
import Images from '../assets/images';
import { getMemberDataAsync, getMemberBarcodeAsync } from '../utils/storageApi';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import DateTime from '../components/dateTime';
import { UserProp, UserValue } from '../style/Text';

const styles = StyleSheet.create({
  userProp: {
    fontSize: 18,
    marginBottom: 5,
    width: '100%',
    color: 'pink',
  },
  userValue: {
    fontSize: 20,
    fontFamily: 'OCR A Std',
    width: '100%',
  },
  dateProp: {
    fontSize: 18,
    marginBottom: 5,
    width: '100%',
    color: 'pink',
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

class Home extends React.Component {
  state = {
    memberRequestCompleted: false,
    fontLoaded: false,
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
    Font.loadAsync({
      'OCR A Std': require('../assets/fonts/OCRAStd.ttf'),
    }).then(() => this.setState({ fontLoaded: true }));
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
        {this.state.memberRequestCompleted && this.state.fontLoaded ? (
          <ScrollView
            style={{ backgroundColor: backgroundRed }}
            contentContainerStyle={{
              margin: 40,
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <View style={{ flex: 2 }}>
              <Image
                source={Images.PSALogo}
                style={{
                  height: '100%',
                  width: '100%',
                  aspectRatio: 1.5,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <DateTime prop={styles.dateProp} value={styles.userValue} />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'space-around',
                alignItems: 'flex-start',
              }}
            >
              <View>
                <UserProp style={styles.userProp}>MEMBER NO: </UserProp>
                <UserValue style={styles.userValue}>{m.member_no}</UserValue>
              </View>

              <View>
                <UserProp style={styles.userProp}>MEMBER NAME: </UserProp>
                <UserValue style={styles.userValue}>
                  {`${m.first_name.toUpperCase()} ${m.surname.toUpperCase()}`}
                </UserValue>
              </View>
            </View>
            <View
              style={{
                flex: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  margin: 200,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
              >
                <Image
                  source={{ uri: this.state.barcode }}
                  style={{
                    flex: 0.8,
                    height: '100%',
                    width: '80%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                  }}
                  resizeMode="stretch"
                />
                <View style={{ paddingTop: 5, backgroundColor: 'white' }}>
                  <Text>
                    <UserValue
                      style={[
                        styles.userValue,
                        {
                          textAlign: 'center',
                          fontSize: 22,
                          color: 'black',
                        },
                      ]}
                    >
                      {`${m.barcode_no}`}
                    </UserValue>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        ) : (
          <ActivityIndicator />
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
