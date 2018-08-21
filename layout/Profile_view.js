import React, { Component, PureComponent } from 'react';
import { ActivityIndicator, WebView, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import { CustomSafeAreaView } from '../style/Text';
import Head from '../components/headerSignedIn';

export class ProfileView extends Component {
  state = { spinnerVisible: true };
  showSpinner() {
    console.log('Show Spinner');
    this.setState({ spinnerVisible: true });
  }

  hideSpinner() {
    console.log('Hide Spinner');
    this.setState({ spinnerVisible: false });
  }

  render({ sourceURL, navigationAction } = this.props) {
    debugger;
    return (
      <CustomSafeAreaView style={[{ flex: 1 }]}>
        <Head
          icon="menu"
          action={() => navigationAction()}
          title="Profile Screen"
        />
        <Spinner
          visible={this.state.spinnerVisible}
          textContent="Loading..."
          textStyle={{ color: '#000' }}
        />
        <WebView
          source={{ uri: () => sourceURL() }}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
        />
      </CustomSafeAreaView>
    );
  }
}

export class ProfileViewLoader extends PureComponent {
  render({ navigationAction } = this.props) {
    return (
      <CustomSafeAreaView style={[{ flex: 1 }]}>
        <Head
          icon="menu"
          action={() => navigationAction()}
          title="Profile Screen"
        />
        <Spinner
          visible
          textContent="Loading..."
          textStyle={{ color: '#FFF' }}
        />
      </CustomSafeAreaView>
    );
  }
}

export class NoInternetView extends PureComponent {
  render() {
    return (
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
  }
}
