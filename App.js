import React from 'react';
import RelayExample from './components/RelayExample'
import { StyleSheet, View } from 'react-native';
import Sync from './sync/sync'

export default class App extends React.Component {

  render() {
    console.log('synncer',Sync)
    const sinker = new Sync()
    // sinker.syncOnInterval(1000,1000)
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
