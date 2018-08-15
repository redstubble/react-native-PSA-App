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
  Row,
} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import DateTime from '../components/dateTime';
import Header from '../components/header';
import CustomTextInput from '../components/customTextInput';
import Images from '../assets/images';
import * as PsaApi from '../utils/psaApi';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: '100%',
    backgroundColor: backgroundWhite,
  },
  textLink: {
    margin: 5,
    color: textWhite,
    fontSize: 15,
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
          style={{ backgroundColor: backgroundRed }}
          contentContainerStyle={{
            padding: 40,
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
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
          </View>
          <View
            style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ flex: 1 }}>
              <DateTime />
            </View>
            <View style={{ flex: 3, marginTop: '10%', width: '90%' }}>
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
                    color: textWhite,
                    textAlign: 'center',
                    padding: 5,
                  }}
                >
                  {this.state.msg}
                </Text>
              )}
              {this.state.isLoggingIn && <ActivityIndicator />}
            </View>
            <View style={{ flex: 3, paddingTop: 10, width: '100%' }}>
              <Button
                disabled={
                  this.state.isLoggingIn ||
                  !this.state.email ||
                  !this.state.password
                }
                onPress={this.userLogin}
                title="Login"
                color="white"
                buttonStyle={{ backgroundColor: 'darkred' }}
                disabledStyle={{ backgroundColor: 'darkred' }}
                disabledTextStyle={{ color: 'red' }}
              />
            </View>
          </View>
          <View
            style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={styles.textLink}
              onPress={() =>
                Linking.openURL(
                  'https://www.psa.org.nz/psasecurity/lostpassword',
                )
              }
            >
              Forgot Login
            </Text>
            <Text
              style={styles.textLink}
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
