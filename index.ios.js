/**
 * Scanbot Example
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Image,
  TouchableOpacity
} from 'react-native';

const SBScanbot = NativeModules.SBScanbot;

// Set valid license here
SBScanbot.setLicense('');

export default class ScanbotExample extends Component {

  state = {
    error: false,
    image: false,
  };

  onPress = async () => {
    try {
      const image = await SBScanbot.scan({});
      this.setState({ image });
    } catch (ex) {
      this.setState({ error: 'Scanning Failed' });
    }
  };

  render() {
    const { error, image } = this.state;
    return (
      <View style={styles.viewport}>
        {error && (
          <Text style={styles.error}>error</Text>
        )}

        {image && (
          <Image
            style={styles.image}
            source={{ uri: `data:image/jpeg;base64,${image}` }}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>{image ? 'Scan again' : 'Scan document'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    padding: 10,
    margin: 5,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth
  },
  error: {
    color: 'red',
  },
  image: {
    width: 320,
    height: 500,
    resizeMode: Image.resizeMode.contain,
  },
});

AppRegistry.registerComponent('ScanbotExample', () => ScanbotExample);
