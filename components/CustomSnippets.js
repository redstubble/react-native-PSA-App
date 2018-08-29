import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import { CustomSafeAreaView } from '../style/Text';
import Head from './headerSignedIn';
import { backgroundRed } from '../utils/colors';

export const CustomContainer = (
  {
    title, navigationAction, hideHeader, children, icon,
  } = this.props,
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
  <View style={{ position: 'absolute', top:0, bottom:0, left:0, right:0, flex: 1, justifyContent: 'center', alignItems: 'center' }} >
    <ActivityIndicator animating={visible} color="#fff" size="large" hidesWhenStopped />
    <Text style={{ color: 'white', fontSize: 20 }}>...Loading</Text>
  </View>
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
    <ActivityIndicator color="#fff" size="large" />
    <View>
      <Text style={{ color: 'white', fontSize: 20 }}>{msg}</Text>
    </View>
  </View>
);
