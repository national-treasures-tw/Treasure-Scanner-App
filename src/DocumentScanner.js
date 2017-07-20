/**
 * Scanbot Example
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ListView,
  Dimensions, Button,
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
} from './Scanbot/Scanbot';
import { TabBarBottom } from 'react-navigation';

// These can be translated to Mandrin
const labelTranslations = {
  "cancelButton": "Cancel",
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

export const winSize = Dimensions.get('window');

export default class DocumentScanner extends Component {
  constructor(props, context) {
    super(props, context);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    this.state = {
      error: false,
      documents: [],
      scrollIndex: 0,
      dataSource: dataSource.cloneWithRows([]),
    };
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `Documents`,
      headerRight: <Button title="Scan" onPress={() => params.scan()} />,
    };
  };

  componentDidMount = () => {
    const { documents } = this.state;
    if(documents.length === 0) {
      this.scan();
    }

    this.props.navigation.setParams({ scan: this.scan })
  };

  updateDocuments = (newDocuments) => {
    const { dataSource } = this.state;
    this.setState({
      documents: newDocuments,
      dataSource: dataSource.cloneWithRows(newDocuments),
    });
  };

  scan = async () => {
    try {
      StatusBar.setHidden(true, true);
      // See 'Scanbot/Scanbot.js' for all options and documentation
      const documents = await Scanbot.scan({
        imageScale: 1,
        autoCaptureSensitivity: 0.83, // delay of 0.5s
        acceptedSizeScore: 50,
        acceptedAngleScore: 70,
        initialImageMode: SBSDKImageModeColor,
        initialShutterMode: SBSDKShutterModeSmart,
        labelTranslations: labelTranslations,
      });
      StatusBar.setHidden(false, true);

      if(!documents || documents.length === 0) {
        // User cancelled
        return;
      }

      // Just to be sure only use documents that contain am image
      const newDocuments = documents.filter(document =>
        document && document.image
      );

      this.updateDocuments(newDocuments);
    } catch (ex) {
      this.setState({ error: `Scanning Failed ${ex}` });
    }
  };

  onCrop = async () => {
    const { documents, scrollIndex } = this.state;

    try {
      StatusBar.setHidden(true, true);
      // See 'Scanbot/Scanbot.js' for all options and documentation
      const croppedDocument = await Scanbot.crop(documents[scrollIndex]);
      StatusBar.setHidden(false, true);

      if (!croppedDocument || !croppedDocument.image) {
        // user canceled the crop
        return;
      }

      const newDocuments = [...documents];
      newDocuments[scrollIndex] = croppedDocument;
      this.updateDocuments(newDocuments);

    } catch (ex) {
      this.setState({ error: `Scanning Failed ${ex}` });
    }
  };

  onRotate = () => {
    const { documents, scrollIndex } = this.state;
    const newDocuments = [...documents];
    newDocuments[scrollIndex] = Object.assign({}, documents[scrollIndex], {
      rotation: (documents[scrollIndex].rotation || 0) + 90
    });
    this.updateDocuments(newDocuments);
  };

  onDelete = () => {
    const { documents, scrollIndex } = this.state;
    this.updateDocuments([
      ...documents.slice(0, scrollIndex),
      ...documents.slice(scrollIndex + 1)
    ]);
  };

  onScroll = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const { documents } = this.state;

    this.setState({
      // User might have scrolled or bounced before beginning or end
      scrollIndex: Math.min(
        Math.max(documents.length - 1, 0),
        Math.round(Math.max(0, x) / winSize.width)
      )
    });
  };

  render() {
    const { error, documents, scrollIndex } = this.state;

    const document = documents[scrollIndex];

    return (
      <View style={styles.viewport}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Error</Text>
          </View>
        )}

        {!error && documents.length > 0 && (
          <ListView
            dataSource={this.state.dataSource}
            style={styles.list}
            data={documents}
            onScroll={this.onScroll}
            extraData={this.state}
            horizontal={true}
            pagingEnabled={true}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            renderRow={(document, index) => (
              <View
                style={styles.listItem}
                key={index}
              >
                <Image
                  style={[
                    styles.image,
                    document.rotation ? { transform: [{ rotate: `${document.rotation}deg`}] } : {},
                    (document.rotation % 90 === 0) ? styles.rotatedImage : {}
                  ]}
                  source={{ uri: `data:image/jpeg;base64,${document.image}` }}
                />
              </View>
            )}
          />
        )}

        {!error && documents.length === 0 && (
          <View style={styles.errorContainer}>
            <Text style={styles.info}>Your scanned documents will appear here</Text>
          </View>
        )}

        {documents.length > 0 && document && (
          <View style={styles.bottomTabBar}>
            <Button
              disabled={!document.originalImage}
              style={styles.button}
              onPress={() => this.onCrop()}
              title="Crop"
            />
            <Button
              style={styles.button}
              onPress={this.onRotate}
              title="Rotate"
            />
            <Button
              style={styles.button}
              onPress={this.onDelete}
              title="Delete"
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewport: {
    paddingTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    width: winSize.width,
    height: winSize.height - 50,
    alignItems: 'center',
  },
  image: {
    width: winSize.width - 40,
    height: winSize.height - 50,
    resizeMode: Image.resizeMode.contain,
  },
  rotatedImage: {
    width: winSize.height - 50,
    height: winSize.width - 40,
  },
  errorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    textAlign: 'center',
    color: 'gray'
  },
  error: {
    color: 'red',
  },
  bottomTabBar: {
    flexDirection: 'row',
    width: winSize.width,
    backgroundColor: '#f1f1f1',
    justifyContent: 'space-around',
    padding: 8,
  },
  button: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1
  },
});
