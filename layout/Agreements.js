import React, { Component } from 'react';
import { SafeAreaView, DrawerActions } from 'react-navigation';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Head from '../components/headerSignedIn';
import { getMemberDataAsync } from '../utils/storageApi';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { UserProp, UserValue, CustomSafeAreaView } from '../style/Text';
import {
  CustomSpinner,
  CustomContainer,
  CustomWiFiConnectionError,
} from '../components/CustomSnippets';

const Container = ({ navigation } = this.props) => (
  <CustomSafeAreaView style={[{ flex: 1 }]}>
    <Head
      icon="menu"
      action={() => navigation.dispatch(DrawerActions.openDrawer())}
      title="My Documents"
    />
    <View style={{ backgroundColor: backgroundRed, flex: 1 }}>
      {this.props.children}
    </View>
  </CustomSafeAreaView>
);

const hashCode = (str) =>
  str
    .split('')
    .reduce(
      (prevHash, currVal) =>
        ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
      0,
    );

const CollectiveAgreement = ({ navigation, agreement } = this.props) => (
  <View
    style={
      {
        margin: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: textWhite,
      } // flex:1,
    }
  >
    <MaterialCommunityIcons
      name="file"
      size={32}
      color={backgroundRed}
      style={{ marginRight: 10 }}
    />
    <Text
      style={{ color: 'black' }}
      onPress={() =>
        navigation.navigate('Agreement', {
          link: agreement.path,
        })
      }
    >
      {agreement.name}
    </Text>
  </View>
);

export default class Documents extends Component {
  state = {
    memberRequestCompleted: false,
    member: false,
  };

  componentDidMount() {
    this.populateMemberData();
  }

  populateMemberData = async () => {
    const member = await getMemberDataAsync();
    if (!member.valid) console.error('Member Data Invalid Error');
    this.setState({
      member,
      memberRequestCompleted: true,
    });
  };

  render({ navigation } = this.props) {
    let agreements = null;
    if (this.state.memberRequestCompleted) {
      agreements = this.state.member.collective_agreements.map(
        (agreement, k) => (
          <CollectiveAgreement
            navigation={navigation}
            agreement={agreement}
            key={hashCode(agreement.fileName.slice(0, 15))}
          />
        ),
      );
    } else {
      agreements = <CustomSpinner />;
    }
    return (
      <CustomContainer
        navigationAction={() => navigation.dispatch(DrawerActions.openDrawer())}
        title="My Document"
      >
        {agreements}
      </CustomContainer>
    );
  }
}
