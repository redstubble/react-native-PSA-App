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
      <Header leftComponent={{ icon: 'menu', color: '#000' }} />
      // <Left>
      //   <Button onPress={() => this.props.navigation.navigate('DrawerOpen')}>
      //     <Icon name="menu" />
      //   </Button>
      // </Left>
    );
  }
}
