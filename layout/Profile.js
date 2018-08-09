import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { ActivityIndicator, StyleSheet, View, WebView } from 'react-native';
import PropTypes from 'prop-types';
import { getMemberDataAsync } from '../utils/storageApi';
import Head from '../components/headerSignedIn';
import { PROFILEPAGE } from '../utils/environment';

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

class Profile extends React.Component {
  state = {
    memberRequestCompleted: false,
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

  profileUrl = () =>
    `${PROFILEPAGE}?api=1&u=${this.state.member.id}&p=${
      this.state.member.token
    }`;

  render({ navigation, screenProps } = this.props) {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          icon="menu"
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Profile Screen"
        />
        {!this.state.memberRequestCompleted ? (
          <ActivityIndicator />
        ) : (
          <WebView
            source={{ uri: this.profileUrl() }}
            style={{ marginTop: 20 }}
          />
        )}
      </SafeAreaView>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
