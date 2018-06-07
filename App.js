import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './components/login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  render() {
    if (this.state.isLoggedIn) return <div>Secured</div>;
    return (
      <View style={styles.container}>
        <Login onLoginPress={() => this.setState({ isLoggedIn: true })} />
      </View>
    );
  }
}

export default App;
