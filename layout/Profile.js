import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { UserProp, UserValue, CustomSafeAreaView } from '../style/Text';
import { ActivityIndicator, StyleSheet, View, WebView } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { getMemberDataAsync } from '../utils/storageApi';
import Head from '../components/headerSignedIn';
import { PROFILEPAGE } from '../utils/environment';

class Profile extends React.Component {
  state = {
    memberRequestCompleted: false,
    visible: true,
  };
  componentDidMount() {
    this.populateMemberData();
  }

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
    return (
      <CustomSafeAreaView style={[{ flex: 1, backgroundColor: backgroundRed }]}>
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
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
