import React from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import {
  Text,
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { PropTypes } from 'prop-types';
import Head from '../components/headerSignedIn';
import { getMemberDataAsync } from '../utils/storageApi';

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

class Home extends React.Component {
  state = {
    memberRequestCompleted: false,
    member: {},
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

  render({ navigation } = this.props) {
    return (
      <SafeAreaView style={[{ flex: 1, backgroundColor: '#ecf0f1' }]}>
        <Head
          action={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Home Screen"
        />
        {!this.state.memberRequestCompleted ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.container}>
            <Text style={[styles.paragraph, { color: '#000' }]}>
              {JSON.stringify(this.state.member)}
            </Text>
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
