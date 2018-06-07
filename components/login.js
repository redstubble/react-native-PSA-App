import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import Environment from '../utils/environment';

class Login extends Component {
  state = {
    username: '',
    password: '',
    isLoggingIn: false,
    msg: '',
  };

  userLogin = () => {
    this.setState({ isLoggingIn: true, msg: '' });
    const params = {
      username: this.state.username,
      password: this.state.password,
      grant_type: 'password',
    };
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
      <ScrollView style={{ padding: 20 }}>
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput
          placeholder="Username"
          type="text"
          value={this.state.username}
          onChange={(username) => this.setState({ username })}
        />
        <TextInput
          placeholder="Password"
          type="text"
          value={this.state.email}
          onChange={(password) => this.setState({ password })}
        />
        {!!this.state.msg && (
          <Text style={{ fontSize: 14, color: 'red', padding: 5 }}>
            {this.state.msg}
          </Text>
        )}
        {this.state.isLoggingIn && <ActivityIndicator />}
        <Button onPress={this.props.onLoginPress} title="Submit" />
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
