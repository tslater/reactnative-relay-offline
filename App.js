import React from 'react';
import RelayExample from './components/RelayExample'
import { StyleSheet, View } from 'react-native';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <RelayExample />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
});
