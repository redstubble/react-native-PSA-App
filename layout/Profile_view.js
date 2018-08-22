import React, { Component, PureComponent } from 'react';
import { WebView } from 'react-native';
import {
  CustomSpinner,
  CustomContainer,
  CustomWiFiConnectionError,
} from '../components/CustomSnippets';

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
    return (
      <CustomContainer
        title="Profile Screen"
        navigationAction={navigationAction}
      >
        <CustomSpinner visible={this.state.spinnerVisible} />
        <WebView
          source={{ uri: sourceURL }}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
        />
      </CustomContainer>
    );
  }
}

export class ProfileViewLoader extends PureComponent {
  render({ navigationAction } = this.props) {
    return (
      <CustomContainer
        title="Profile Screen"
        navigationAction={navigationAction}
      >
        <CustomSpinner visible />
      </CustomContainer>
    );
  }
}

export class NoInternetView extends PureComponent {
  render({ navigationAction } = this.props) {
    return (
      <CustomContainer
        title="Profile Screen"
        navigationAction={navigationAction}
      >
        <CustomWiFiConnectionError />
      </CustomContainer>
    );
  }
}
