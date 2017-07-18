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
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Scanbot, {
  SBSDKImageModeColor,
  SBSDKImageModeGrayscale,
  SBSDKShutterModeSmart,
  SBSDKShutterModeAlwaysAuto,
  SBSDKShutterModeAlwaysManual,
  SBSDKDocumentDetectionStatusOK,
  SBSDKDocumentDetectionStatusOK_SmallSize,
  SBSDKDocumentDetectionStatusOK_BadAngles,
  SBSDKDocumentDetectionStatusOK_BadAspectRatio,
  SBSDKDocumentDetectionStatusOK_Capturing,
  SBSDKDocumentDetectionStatusError_NothingDetected,
  SBSDKDocumentDetectionStatusError_Brightness,
  SBSDKDocumentDetectionStatusError_Noise,
} from './src/Scanbot/Scanbot';

// Set valid license here
Scanbot.setLicense('Px/ikVYDSTzigYnpa+pwcXluzh/sk6B+16D2zqRf2fK2HgvBDRI6ofHV+DmVSLJMgcXprW7h4bEMKkczYth3SsPeV7B0CLQJdnblxXTnC/DAAFmJxQMK+0Icl9deZWuzeZW/YDT4fCvQRLAFgaFLQKWzYzBmoZj+Sanl0R5OOdG+/thIvTQMXJF+vSvW3NGQzr1ADUKsZ8ye3O5ERLKsMtQo+kAMA/krKVPpMStHN+8lP+CU1Qb4Z7cWjSjCcqIBT3HS5e3oPDqDrp9Spy81XXYfr/KTlRIT9G7ZZIsi3650tpB1KE3zJvUzolBlKMuUVNpGHC4NjFyBUbPU6mS9Ow==\nU2NhbmJvdFNESwpUTlQuVGFpd2FuLVRyZWF1c3JlCjE1MDE4OTExOTkKNzgKMQ==\n');

// These can be translated to Mandrin
const labelTranslations = {
  "cancelButton": "cancel",
  "singularDocument": "1 Page",
  "pluralDocuments": "%d Pages",

  "imageMode": {
    [SBSDKImageModeColor]: "Color",
    [SBSDKImageModeGrayscale]: "Grayscale",
  },

  "shutterMode": {
    [SBSDKShutterModeSmart]: "Smart",
    [SBSDKShutterModeAlwaysAuto]: "Automatic",
    [SBSDKShutterModeAlwaysManual]: "Manual",
  },

  "detectionStatus": {
    "capturing": "Capturing",
    [SBSDKDocumentDetectionStatusOK]: "Don't move... capturing!",
    [SBSDKDocumentDetectionStatusOK_SmallSize]: "Move closer.",
    [SBSDKDocumentDetectionStatusOK_BadAngles]: "Turn your device a bit.",
    [SBSDKDocumentDetectionStatusOK_BadAspectRatio]: "Rotate your device.",
    [SBSDKDocumentDetectionStatusOK_Capturing]: "Saving Document...",
    [SBSDKDocumentDetectionStatusError_NothingDetected]: "Searching for document...",
    [SBSDKDocumentDetectionStatusError_Brightness]: "Not enough light!",
    [SBSDKDocumentDetectionStatusError_Noise]:"Background too noisy!"
  },
};

export default class ScanbotExample extends Component {

  state = {
    error: false,
    images: [],
  };

  onPress = async () => {
    try {
      StatusBar.setHidden(true, true);
      // See 'Scanbot/Scanbot.js' for all options and documentation
      const images = await Scanbot.scan({
        imageScale: 1,
        autoCaptureSensitivity: 0.66,
        acceptedSizeScore: 80,
        acceptedAngleScore: 75,
        initialImageMode: SBSDKImageModeColor,
        initialShutterMode: SBSDKShutterModeSmart,
        labelTranslations: labelTranslations,
      });
      StatusBar.setHidden(false, true);
      this.setState({ images: images });
    } catch (ex) {
      this.setState({ error: `Scanning Failed ${ex}` });
    }
  };

  render() {
    const { error, images } = this.state;
    return (
      <View style={styles.viewport}>
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}

        <View style={styles.images}>
          {images.length > 0 && images.map((image, index) => (
            <Image
              key={index}
              style={styles.image}
              source={{ uri: `data:image/jpeg;base64,${image}` }}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>{images.length ? 'Scan again' : 'Scan documents'}</Text>
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
  images: {
    flexDirection: 'row',
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
    width: 90,
    height: 200,
    resizeMode: Image.resizeMode.contain,
  },
});

AppRegistry.registerComponent('ScanbotExample', () => ScanbotExample);
