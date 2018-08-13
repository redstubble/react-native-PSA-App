import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TextInput } from 'react-native';

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: props.name,
    };
  }

  render({ controlFunc, password } = this.props) {
    return (
      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          backgroundColor: '#fff',
          padding: 10,
          color: '#000',
        }}
        // placeholderTextColor="#000"
        placeholder={this.state.Name}
        type="text"
        secureTextEntry={password}
        onChangeText={(e) => controlFunc(e)}
      />
    );
  }
}

CustomTextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CustomTextInput;
