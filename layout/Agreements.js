import React, { Component } from 'react';
import { DrawerActions } from 'react-navigation';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getMemberDataAsync } from '../utils/storageApi';
import { textWhite, backgroundRed, backgroundWhite } from '../utils/colors';
import { CustomSpinner, CustomContainer } from '../components/CustomSnippets';

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
    style={{
      margin: 20,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: textWhite,
    }}
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
          name: agreement.name,
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
