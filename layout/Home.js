import React from 'react';
import { DrawerActions } from 'react-navigation';
import {Dimensions } from 'react-native';
import { PropTypes } from 'prop-types';
import { Font, Asset, AppLoading } from 'expo';
import Head from '../components/headerSignedIn';
import Images from '../assets/images';
import { getMemberDataAsync, getMemberBarcodeAsync } from '../utils/storageApi';
import { CustomSafeAreaView } from '../style/Text';
import Orientation from '../utils/orientation';
import { HomeLoader, LandscapeView, PortraitView, MemberDetail } from '../layout/Home_view';

const landscapeBackground = require('../assets/img/hor-bg.jpg');
const landscapeBackgroundCard = require('../assets/img/credit-bg.png');
const OCRAStd = require('../assets/fonts/OCRAStd.ttf');

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

class Home extends React.Component {
  state = {
    memberRequestCompleted: false,
    isReady: false,
    portraitOrientation: Orientation.isPortrait() === true,
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
    Dimensions.addEventListener('change', this.handleOrientation);
    this.populateMemberData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientation);
  }
  
  loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      landscapeBackground, landscapeBackgroundCard,
    ]);

    const fontAssets = cacheFonts([{
      'OCR A Std': OCRAStd,
    }]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }


  handleOrientation = () =>
    this.setState({
      portraitOrientation: Orientation.isPortrait() === true,
    });

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


  memberView = (m) => {
    const barcodeValue = m.barcode_no;
    const barcodeImg = this.state.barcode;
    const logo = Images.PSALogo;
    const memberNo = m.member_no;
    const memberValue = `${m.first_name.toUpperCase()} ${m.surname.toUpperCase()}`;
    if (this.state.portraitOrientation) {
      return (
        <PortraitView barcodeValue={barcodeValue} barcodeImg={barcodeImg} logo={logo} >
          <MemberDetail memberNo={m.member_no} memberValue={`${m.first_name.toUpperCase()} ${m.surname.toUpperCase()}`} />
        </PortraitView>);
    }
    return (
      <LandscapeView
        background={landscapeBackground} 
        backgroundCard={landscapeBackgroundCard} 
        barcodeValue={barcodeValue} 
        barcodeImg={barcodeImg} 
        logo={logo} 
      >
        <MemberDetail memberNo={memberNo} memberValue={memberValue} />
      </LandscapeView>
    );
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
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <CustomSafeAreaView>
        {this.state.portraitOrientation ? this.header(navigation) : null}
        {this.state.memberRequestCompleted && this.state.isReady ? (
          this.memberView(m)
        ) : <HomeLoader />
        }
      </CustomSafeAreaView>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
