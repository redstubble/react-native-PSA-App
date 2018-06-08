import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, ScrollView, Text, Button } from 'react-native';
import Environment from '../utils/environment';
import Header from '../components/header';
import CustomTextInput from '../components/customTextInput';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  state = {
    username: '',
    password: '',
    isLoggingIn: false,
    msg: '',
  };

  handleUsernameChange(n) {
    console.log(n);
    this.setState({ username: n });
  }
  handlePasswordChange(p) {
    console.log(p);
    this.setState({ password: p });
  }

  userLogin = () => {
    this.setState({ isLoggingIn: true, msg: '' });
    const params = {
      username: this.state.username,
      password: this.state.password,
      grant_type: 'password',
    };
    console.log(params);
    let formBody = [];
    Object.keys(params).forEach((prop) => {
      const encodedKey = encodeURIComponent(prop);
      const encodedValue = encodeURIComponent(params[prop]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    });

    formBody = formBody.join('&');

    let proceed = false;
    fetch(`https://${Environment.CLIENT_API}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) this.setState({ msg: response.message });
        else proceed = true;
      })
      .then(() => {
        this.setState({ isLoggingIn: false });
        if (proceed) this.props.onLoginPress();
      })
      .catch((err) => {
        this.setState({ msg: err.message });
        this.setState({ isLoggingIn: false });
      })
      .done();
  };

  render() {
    return (
      <ScrollView style={{ alignSelf: 'stretch' }}>
        <Header text="Login to PSA" />
        <Text style={{ fontSize: 27, flex: 1 }}>Img</Text>
        <Text style={{ fontSize: 27, flex: 1 }}>Date & Time</Text>
        <CustomTextInput
          controlFunc={this.handleUsernameChange}
          name="Username"
        />

        <CustomTextInput
          controlFunc={this.handlePasswordChange}
          name="Password"
          password
        />
        {!!this.state.msg && (
          <Text style={{ fontSize: 14, color: 'red', padding: 5 }}>
            {this.state.msg}
          </Text>
        )}
        {this.state.isLoggingIn && <ActivityIndicator />}
        <Button
          disabled={
            this.state.isLoggingIn ||
            !this.state.username ||
            !this.state.password
          }
          onPress={this.userLogin}
          title="Submit"
        />
      </ScrollView>
    );
  }
}

Login.propTypes = {
  onLoginPress: PropTypes.func.isRequired,
};

export default Login;
