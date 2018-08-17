import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  WebView,
  NetInfo,
  Text,
} from 'react-native';
import { Permissions } from 'expo';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { UserProp, UserValue, CustomSafeAreaView } from '../style/Text';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { getMemberDataAsync } from '../utils/storageApi';
import Head from '../components/headerSignedIn';
import { PROFILEPAGE } from '../utils/environment';

class Profile extends React.Component {
  state = {
    memberRequestCompleted: false,
    visible: true,
    isConnected: false,
  };
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleConnectionChange,
    );
    this.populateMemberData();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange,
    );
  }

  handleConnectionChange = (isConnected) => {
    debugger;
    this.setState({ isConnected });
  };

  showSpinner() {
    console.log('Show Spinner');
    this.setState({ visible: true });
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({ visible: false });
  }

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    if (!member.valid) console.error('Member Data Invalid Error');
    this.setState({
      member,
      memberRequestCompleted: true,
    });
  };

  profileUrl = () =>
    `${PROFILEPAGE}?api=1&u=${this.state.member.id}&p=${
      this.state.member.token
    }`;

  render({ navigation, screenProps } = this.props) {
    if (true || this.state.isConnected) {
      return (
        <CustomSafeAreaView
          style={[{ flex: 1, backgroundColor: backgroundRed }]}
        >
          <Head
            icon="menu"
            action={() => navigation.dispatch(DrawerActions.openDrawer())}
            title="Profile Screen"
          />
          <Spinner
            visible={this.state.visible}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
          {!this.state.memberRequestCompleted ? (
            <ActivityIndicator />
          ) : (
            <WebView
              source={{ uri: this.profileUrl() }}
              onLoadStart={() => this.showSpinner()}
              onLoad={() => this.hideSpinner()}
            />
          )}
        </CustomSafeAreaView>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundRed,
        }}
      >
        <View>
          <Ionicons
            name="ios-wifi"
            size={60}
            color="#fff"
            style={{ marginRight: 'auto', marginLeft: 'auto' }}
          />
          <Text style={{ color: 'white', fontSize: 20 }}>
            Please check your network connection.
          </Text>
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
