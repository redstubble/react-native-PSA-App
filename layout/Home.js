import React from 'react';
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
import { HomeLoader, LandscapeView, PortraitView, MemberDetail } from '../layout/Home_view';

class Home extends React.Component {
  state = {
    memberRequestCompleted: false,
    fontLoaded: false,
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
    Font.loadAsync({
      'OCR A Std': require('../assets/fonts/OCRAStd.ttf'),
    }).then(() => this.setState({ fontLoaded: true }));
    this.populateMemberData();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleOrientation);
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
      <LandscapeView barcodeValue={barcodeValue} barcodeImg={barcodeImg} logo={logo} >
        <MemberDetail memberNo={memberNo} memberValue={memberValue} />
      </LandscapeView>
    )
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
      <CustomSafeAreaView>
        {this.state.portraitOrientation ? this.header(navigation) : null}
        {this.state.memberRequestCompleted && this.state.fontLoaded ? (
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
