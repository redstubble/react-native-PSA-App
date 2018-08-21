import React, { PureComponent, Component } from 'react';
import { DrawerActions } from 'react-navigation';
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
  Transforms,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { Font } from 'expo';
import Head from '../components/headerSignedIn';
import Images from '../assets/images';
import { getMemberDataAsync, getMemberBarcodeAsync } from '../utils/storageApi';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import DateTime from '../components/dateTime';
import { UserProp, UserValue, CustomSafeAreaView } from '../style/Text';
import Orientation from '../utils/orientation';

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  userProp: {
    fontSize: 14,
    marginBottom: 5,
    width: '100%',
    color: '#FEC2C2',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  userValue: {
    fontSize: 18,
    fontFamily: 'OCR A Std',
    width: '100%',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 2,
  },
  barcodeValue: {
    fontSize: 18,
    fontFamily: 'OCR A Std',
    width: '100%',
  },
  dateProp: {
    fontSize: 14,
    marginBottom: 5,
    width: '100%',
    color: 'pink',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  dateValue: {
    fontSize: 14,
  },
});

// class HomeView extends React.Component {
//   state = {
//     memberRequestCompleted: false,
//     fontLoaded: false,
//     portraitOrientation: Orientation.isPortrait() === true,
//     devicetype: Orientation.isTablet() ? 'tablet' : 'phone',
//     member: {
//       first_name: '',
//       surname: '',
//       email: '',
//       member_no: '',
//       barcode_source: '',
//       barcode_no: 0,
//       barcode_img: '',
//     },
//   };

//   componentDidMount() {
//     Font.loadAsync({
//       'OCR A Std': require('../assets/fonts/OCRAStd.ttf'),
//     }).then(() => this.setState({ fontLoaded: true }));
//   }

  export class memberDetail extends Component {
    render({memberNo, memberValue} = this.props ) {
      return (
        <View
        style={{
          flex: 4,
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <UserProp style={styles.userProp}>MEMBER NO: </UserProp>
          <UserValue style={styles.userValue}>{memberNo}</UserValue>
        </View>
  
        <View>
          <UserProp style={styles.userProp}>MEMBER NAME: </UserProp>
          <UserValue style={styles.userValue}>
            {memberValue}
          </UserValue>
        </View>
      </View>
      )
    }
  }


export class LandscapeView extends Component {
  render({barcodeValue, barcodeImg, logo } = this.props) {
    return (
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
          marginTop: Platform.OS === 'android' ? 20 : 0,
          width: 500,
          height: 280,
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
              justifyContent: 'center',
            }}
          >
            <Image
              source={logo}
              resizeMode="contain"
              style={{ flex: 1, width: '40%', height: '100%' }}
            />
           {this.props.children}
          </View>

          <View
            style={{
              flex: 1,
              height: 220,
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 60,
                marginBottom: 20,
                marginLeft: 20,
                backgroundColor: 'white',
                paddingTop: 20,
                paddingRight: 20,
                paddingLeft: 20,
                transform: [{ rotate: '90deg' }],
              }}
            >
              <Image
                source={{ uri: barcodeImg }}
                resizeMode="stretch"
                style={{ flex: 4 }}
              />
              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  flex: 1,
                }}
              >
                <Text>
                  <UserValue
                    style={[
                      styles.barcodeValue,
                      {
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'black',
                        width: '100%',
                      },
                    ]}
                  >
                    {`${barcodeValue}`}
                  </UserValue>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ImageBackground>
    )
  }
}

export class PortraitView extends Component {
  render({ barcodeValue, barcodeImg, logo } = this.props) {
    return (
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
          source={logo}
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
          <DateTime prop={styles.dateProp} value={styles.dateValue} toUpper />
        </View>
        {this.props.children}
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
            source={{ uri: barcodeImg }}
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
                  styles.barcodeValue,
                  {
                    textAlign: 'center',
                    fontSize: 22,
                    color: 'black',
                  },
                ]}
              >
                {`${barcodeValue}`}
              </UserValue>
            </Text>
          </View>
        </View>
        </View>
      </ScrollView>
    );
  }
}

export class HomeLoader extends PureComponent {
  render() {
    return (
      <View
        style={{
        marginTop: 'auto',
        marginBottom: 'auto',
        justifyContent: 'center',
      }}
      >
        <ActivityIndicator size="large" hidesWhenStopped color="#000" />
      </View>
    );
  }
}
