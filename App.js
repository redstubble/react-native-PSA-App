import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Login from './components/login';
import { psalightred } from './utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: psalightred,
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
      <SafeAreaView style={styles.container}>
        <Login onLoginPress={() => this.setState({ isLoggedIn: true })} />
      </SafeAreaView>
    );
  }
}

export default App;
