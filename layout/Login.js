import React, { Component } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  Image,
  View,
  Linking,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import DateTime from '../components/dateTime';
import Header from '../components/header';
import CustomTextInput from '../components/customTextInput';
import Images from '../assets/images';
import * as PsaApi from '../utils/psaApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  state = {
    email: '',
    password: '',
    isLoggingIn: false,
    msg: null,
  };

  handleEmailChange(n) {
    this.setState({ email: n });
  }
  handlePasswordChange(p) {
    this.setState({ password: p });
  }

  userLogin = async ({ navigation } = this.props) => {
    this.setState({ isLoggingIn: true, msg: '' });
    const psaApi = new PsaApi.LoginAPI(this.state.email, this.state.password);
    const member = await psaApi.signIn();
    this.setState({ isLoggingIn: false });
    if (member.valid) {
      this.props.navigation.navigate('App');
    } else {
      const msg = member.msg || 'Login failed';
      console.log(msg);
      this.setState({ msg });
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <Header text="Login to PSA" />
        <ScrollView
          style={{ backgroundColor: 'red' }}
          contentContainerStyle={{
            margin: 40,
            flex: 1,
            alignSelf: 'stretch',
          }}
        >
          <View style={{ flex: 2 }}>
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
            <View style={{ flexGrow: 1 }} />
            <DateTime style={{ marginTop: 'auto' }} />
          </View>
          <View style={{ flex: 2, height: 200 }}>
            <CustomTextInput
              controlFunc={this.handleEmailChange}
              name="Email"
            />
            <CustomTextInput
              controlFunc={this.handlePasswordChange}
              name="Password"
              password
            />
            {/* cast string as boolean */}
            {!!this.state.msg && (
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                  textAlign: 'center',
                  padding: 5,
                }}
              >
                {this.state.msg}
              </Text>
            )}
            {this.state.isLoggingIn && <ActivityIndicator />}
            <View style={{ paddingTop: 10 }}>
              <Button
                disabled={
                  this.state.isLoggingIn ||
                  !this.state.email ||
                  !this.state.password
                }
                onPress={this.userLogin}
                style={{ marginTop: 10 }}
                title="Login"
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 15,
              }}
              onPress={() =>
                Linking.openURL(
                  'https://www.psa.org.nz/psasecurity/lostpassword',
                )
              }
            >
              Forgot Login
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 15,
              }}
              onPress={() => Linking.openURL('https://www.psa.org.nz/register')}
            >
              Not Registered
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
