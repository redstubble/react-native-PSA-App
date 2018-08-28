import React from 'react';
import { Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import { CustomSafeAreaView } from '../style/Text';
import Head from './headerSignedIn';
import { backgroundRed } from '../utils/colors';

export const CustomContainer = (
  { title, navigationAction, hideHeader, children, icon } = this.props,
) => (
  <CustomSafeAreaView>
    {!hideHeader && (
      <Head
        icon={icon || 'menu'}
        action={() => navigationAction()}
        title={title}
      />
    )}
    <View style={{ flex: 1, backgroundColor: 'darkred' }}>{children}</View>
  </CustomSafeAreaView>
);

export const CustomSpinner = ({ visible } = this.props) => (
  <Spinner
    visible={visible}
    textContent="Loading..."
    textStyle={{ color: '#fff' }}
  />
);

export const CustomWiFiConnectionError = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundRed,
    }}
  >
    <View>
      <Ionicons
        name="ios-wifi"
        size={60}
        color="#fff"
        style={{ marginRight: 'auto', marginLeft: 'auto' }}
      />
      <Text style={{ color: 'white', fontSize: 20 }}>
        Please check your network connection.
      </Text>
    </View>
  </View>
);

export const CustomUserMessage = ({ msg } = this.props) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundRed,
    }}
  >
    <View>
      <Text style={{ color: 'white', fontSize: 20 }}>{msg}</Text>
    </View>
  </View>
);
