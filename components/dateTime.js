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

  render({ prop } = this.props) {
    return (
      <Text>
        <UserProp style={prop}>DATE: </UserProp>
        <UserValue>{this.state.DateTime.format('DD/MM/YYYY')}</UserValue>
        <UserProp style={prop}> TIME: </UserProp>
        <UserValue>{this.state.DateTime.format('LTS')}</UserValue>
      </Text>
    );
  }
}

export default DateTime;
