import React from 'react';
import { Header } from 'react-native-elements';
import { textWhite, headerRed } from '../utils/colors';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Header
        leftComponent={{
          // https://www.materialui.co/icon/arrow-back
          icon: this.props.icon,
          onPress: () => this.props.action(),
          color: textWhite,
        }}
        centerComponent={{
          text: this.props.title,
          style: {
            color: textWhite,
            fontSize: 20,
          },
        }}
        outerContainerStyles={{ backgroundColor: headerRed }}
      />
    );

    // <Left>
    //   <Button onPress={() => this.props.navigation.navigate('DrawerOpen')}>
    //     <Icon name="menu" />
    //   </Button>
    // </Left>
  }
}
