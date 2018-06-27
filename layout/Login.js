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
import base64 from 'base-64';
import { Button } from 'react-native-elements';
// import PropTypes from 'prop-types';
import DateTime from '../components/dateTime';
import Header from '../components/header';
import CustomTextInput from '../components/customTextInput';
import Images from '../assets/images';
import { psalightred } from '../utils/colors';
import * as PsaApi from '../utils/psaApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: psalightred,
    justifyContent: 'center',
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  state = {
    email: '',
    password: '',
    isLoggingIn: false,
    msg: '',
  };

  getHeaders() {
    const head = new Headers();
    const auth = base64.encode(`${this.state.email}:${this.state.password}`);
    head.append('Authorization', `Basic ${auth}`);
    head.append('Access-Control-Allow-Origin', '*');
    head.append(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    return head;
  }

  handleEmailChange(n) {
    this.setState({ email: n });
  }
  handlePasswordChange(p) {
    this.setState({ password: p });
  }

  userLogin = async ({ navigation } = this.props) => {
    this.setState({ isLoggingIn: true, msg: '' });
    const headers = this.getHeaders();
    const psaApi = new PsaApi.LoginAPI(headers);
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
      <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
        <View style={{ flex: 1 }}>
          <Header text="Login to PSA" />
          <ScrollView
            contentContainerStyle={{
              margin: 40,
              flex: 1,
              alignSelf: 'stretch',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                flex: 2,
              }}
            >
              <Image
                source={Images.PSALogo}
                style={{
                  height: 65,
                  width: 1000,
                  aspectRatio: 1.5,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <DateTime />
            <View style={{ flex: 2 }}>
              <CustomTextInput
                controlFunc={this.handleEmailChange}
                name="Email"
              />

              <CustomTextInput
                controlFunc={this.handlePasswordChange}
                name="Password"
                password
              />
            </View>
            <View style={{ flex: 2 }}>
              {!!this.state.msg && (
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    textAlign: 'center',
                    padding: 5,
                  }}
                >
                  {this.state.msg}
                </Text>
              )}
              {this.state.isLoggingIn && <ActivityIndicator />}
              <Button
                disabled={
                  this.state.isLoggingIn ||
                  !this.state.email ||
                  !this.state.password
                }
                onPress={this.userLogin}
                style={{}}
                title="Login"
              />
            </View>
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 15,
                }}
                onPress={() => Linking.openURL('http://google.com')}
              >
                Forgot Login
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 15,
                }}
                onPress={() => Linking.openURL('http://google.com')}
              >
                Not Registered
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
// Login.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default Login;
