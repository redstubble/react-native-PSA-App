import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  ImageBackground,
  Dimensions,
  Transforms,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { Font } from 'expo';
import Head from '../components/headerSignedIn';
import Images from '../assets/images';
import { getMemberDataAsync, getMemberBarcodeAsync } from '../utils/storageApi';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import DateTime from '../components/dateTime';
import { UserProp, UserValue } from '../style/Text';
import Orientation from '../utils/orientation';

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
  dateValue: {
    fontSize: 18,
  },
});

class Home extends React.Component {
  state = {
    memberRequestCompleted: false,
    fontLoaded: false,
    portraitOrientation: Orientation.isPortrait() === true,
    devicetype: Orientation.isTablet() ? 'tablet' : 'phone',
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
    Dimensions.addEventListener('change', () => {
      this.setState({
        portraitOrientation: Orientation.isPortrait() === true,
      });
    });
    Font.loadAsync({
      'OCR A Std': require('../assets/fonts/OCRAStd.ttf'),
    }).then(() => this.setState({ fontLoaded: true }));
    this.populateMemberData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', () => {
      this.setState({
        portraitOrientation: Orientation.isPortrait() === true,
      });
    });
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

  memberDetail = (m) => (
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
  );

  landscapeView = (m) => (
    <ImageBackground
      source={require('../assets/img/hor-bg.jpg')}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
      resizeMode="cover"
    >
      <ImageBackground
        source={require('../assets/img/credit-bg.png')}
        style={{
          width: 500,
          height: 300,
        }}
        resizeMode="stretch"
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingLeft: 50,
            paddingTop: 50,
            paddingBottom: 50,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Image
              source={Images.PSALogo}
              resizeMode="contain"
              style={{ flex: 1, width: '40%', height: '100%' }}
            />
            {this.memberDetail(m)}
          </View>

          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 40,
                marginBottom: 40,
                marginLeft: 20,
                backgroundColor: 'white',
                paddingTop: 5,
                paddingRight: 10,
                paddingLeft: 10,
                transform: [{ rotate: '90deg' }],
              }}
            >
              <Image
                source={{ uri: this.state.barcode }}
                resizeMode="contain"
                style={{ flex: 4 }}
              />
              <View
                style={{
                  paddingTop: 5,
                  flex: 1,
                }}
              >
                <Text>
                  <UserValue
                    style={[
                      styles.userValue,
                      {
                        textAlign: 'center',
                        fontSize: 20,
                        color: 'black',
                        width: '100%',
                      },
                    ]}
                  >
                    {`${m.barcode_no}`}
                  </UserValue>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
  );

  portraitView = (m) => (
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
        <DateTime prop={styles.dateProp} value={styles.dateValue} />
      </View>
      {this.memberDetail(m)}
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
          <View
            style={{
              alignSelf: 'center',
              paddingTop: 5,
              backgroundColor: 'white',
            }}
          >
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
  );

  memberView = (m) => {
    if (this.state.portraitOrientation) {
      return this.portraitView(m);
    }
    return this.landscapeView(m);
  };

  header = (navigation) => (
    <Head
      icon="menu"
      action={() => navigation.dispatch(DrawerActions.openDrawer())}
      title="Home"
    />
  );

  render({ navigation } = this.props) {
    const m = this.state.member;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: backgroundWhite,
        }}
      >
        {this.state.portraitOrientation ? this.header(navigation) : null}
        {this.state.memberRequestCompleted && this.state.fontLoaded ? (
          this.memberView(m)
        ) : (
          <View
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" hidesWhenStopped color="#000" />
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
