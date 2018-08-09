import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { LoggedInHomeText } from '../style/Text';

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
      <LoggedInHomeText
        style={{
          textAlign: 'center',
          flex: 0.5,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Date: </Text>
        {this.state.DateTime.format('DD/mm/YYYY')}
        <Text style={{ fontWeight: 'bold' }}> Time: </Text>
        {this.state.DateTime.format('LTS')}
      </LoggedInHomeText>
    );
  }
}

export default DateTime;
