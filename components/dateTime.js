import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { UserProp, UserValue } from '../style/Text';

class DateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateTime: moment(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      DateTime: moment(),
    });
  }

  render() {
    return (
      <Text
        style={{
          textAlign: 'center',
          flex: 0.5,
        }}
      >
        <UserProp>Date: </UserProp>
        <UserValue>{this.state.DateTime.format('DD/mm/YYYY')}</UserValue>
        <UserProp> Time: </UserProp>
        <UserValue>{this.state.DateTime.format('LTS')}</UserValue>
      </Text>
    );
  }
}

export default DateTime;
