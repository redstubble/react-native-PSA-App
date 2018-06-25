import React from 'react';
import { StatusBar } from 'react-native';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Header
        leftComponent={{
          // https://www.materialui.co/icon/arrow-back
          icon: this.props.icon,
          onPress: () => this.props.action(),
          color: '#fff',
        }}
        centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
      />

      // <Left>
      //   <Button onPress={() => this.props.navigation.navigate('DrawerOpen')}>
      //     <Icon name="menu" />
      //   </Button>
      // </Left>
    );
  }
}
