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
  StatusBar,
  ListView,
  Dimensions,
  Button,
  DeviceEventEmitter,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Scanbot from '../Scanbot/Scanbot';

import * as actions from '../actions/actions';
import config from '../config';
import Status from '../utils/consts';
import getStats from '../selectors/getStats';
import getScannedDocuments from '../selectors/getScannedDocuments';

export const winSize = Dimensions.get('window');

class DocumentReviewList extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `Documents`,
      headerRight: (
        <Button
          title="Scan"
          onPress={async () => {
            StatusBar.setHidden(true, true);

            // start uploading all pending documents
            params.uploadPendingDocuments();

            // See 'Scanbot/Scanbot.js' for all options and documentation
            await Scanbot.scan(config.scanOptions);
            StatusBar.setHidden(false, true);
          }}
        />
      ),
    }
  };

  constructor(props, context) {
    super(props, context);
    const { documents, stats } = this.props;

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    this.state = {
      scrollIndex: 0,
      documents: documents,
      dataSource: dataSource.cloneWithRows([...documents, stats ]),
    };
  };

  componentDidMount = () => {
    const { addDocument, uploadPendingDocuments } = this.props;

    // set params so we can use them in `navigationOptions`
    this.props.navigation.setParams({ uploadPendingDocuments });

    this.imageListener = DeviceEventEmitter.addListener(
      'ImageScanned', (document) => addDocument(document)
    );
  };

  componentWillUnmount() {
    this.imageListener.remove();
  }

  componentWillReceiveProps(newProps) {
    const { dataSource } = this.state;
    const { documents, stats } = this.props;

    this.setState({
      documents: newProps.documents,
      dataSource: dataSource.cloneWithRows([...newProps.documents, stats ]),
    });

    if(newProps.documents.length > documents.length) {
      if(this._listView) {
        this._listView.scrollTo({ x: 0, y: 0 });
      }
    }
  }

  onCrop = async () => {
    const { scrollIndex } = this.state;
    const { documents, cropDocument } = this.props;

    try {
      StatusBar.setHidden(true, true);
      // See 'Scanbot/Scanbot.js' for all options and documentation
      const croppedDocument = await Scanbot.crop(documents[scrollIndex]);
      StatusBar.setHidden(false, true);

      if (documents[scrollIndex].image === croppedDocument.image) {
        // user canceled the crop
        return;
      }

      cropDocument(
        documents[scrollIndex].id,
        croppedDocument.image,
        croppedDocument.polygon
      );

    } catch (ex) {
      alert('Crop failed..', ex);
    }
  };

  onRotate = async () => {
    const { scrollIndex } = this.state;
    const { documents, rotateDocument } = this.props;

    try {
      // See 'Scanbot/Scanbot.js' for all options and documentation
      const rotatedImage = await Scanbot.rotate(documents[scrollIndex].image);
      rotateDocument(
        documents[scrollIndex].id,
        rotatedImage,
      );
    } catch (ex) {
      alert('Rotating failed..', ex);
    }
  };

  onDelete = () => {
    const { scrollIndex } = this.state;
    const { documents, deleteDocument } = this.props;
    deleteDocument(documents[scrollIndex].id);
  };

  onScroll = (event) => {
    const { documents } = this.props;

    this.setState({
      // User might have scrolled or bounced before beginning or end
      scrollIndex: Math.min(
        Math.max(documents.length, 0),
        Math.round(Math.max(0, event.nativeEvent.contentOffset.x) / winSize.width)
      )
    });
  };

  render() {
    const { uploadDocument } = this.props;
    const { scrollIndex, documents } = this.state;

    const document = scrollIndex >= documents.length ? undefined : documents[scrollIndex];

    return (
      <View style={styles.viewport}>

        {documents.length > 0 && (
          <ListView
            ref={(c) => (this._listView = c)}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            style={styles.list}
            onScroll={this.onScroll}
            horizontal={true}
            pagingEnabled={true}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            renderRow={(document, index) => !document.id ? (
              <View
                style={styles.stats}
                key={index}
              >
                {Object.keys(document).map(key => (
                  <View
                    style={styles.infoContainer}
                    key={key}
                  >
                    <Text style={styles.info}>
                      {key}
                    </Text>
                    <Text style={styles.info}>
                      {document[key]}
                    </Text>
                  </View>
                ))}

              </View>
            ) : (
              <View
                style={styles.listItem}
                key={index}
              >
                <Image
                  style={styles.image}
                  source={{ uri: `file://${document.image}`, scale: 1 }}
                />
              </View>
            )}
          />
        )}

        {documents.length === 0 && (
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Your scanned documents will appear here</Text>
          </View>
        )}

        {documents.length > 0 && scrollIndex === documents.length && (
          <View style={styles.bottomTabBar}>
            <Button
              style={styles.button}
              onPress={() => {}}
              title="Stats"
              disabled
            />
          </View>
        )}

        {document && (() => {
          switch (document.status) {
            case Status.UNDEFINED:
              return (
                <View style={styles.bottomTabBar}>
                  <Button
                    disabled={!document.originalImage || document.isNotDocument}
                    style={styles.button}
                    onPress={() => this.onCrop()}
                    title="Crop"
                  />
                  <Button
                    style={styles.button}
                    onPress={() => this.onRotate()}
                    title="Rotate"
                  />
                  <Button
                    style={styles.button}
                    onPress={this.onDelete}
                    title="Delete"
                  />
                </View>
              );
            case Status.LOADING:
              return (
                <View style={styles.bottomTabBar}>
                  <Button
                    style={styles.button}
                    onPress={() => {}}
                    title="Uploading..."
                    disabled
                  />
                </View>
              );
            case Status.LOADED:
              return (
                <View style={styles.bottomTabBar}>
                  <Button
                    style={styles.button}
                    onPress={() => {}}
                    title="Document uploaded"
                    disabled
                  />
                </View>
              );
            case Status.ERROR:
              return (
                <View style={styles.bottomTabBar}>
                  <Button
                    style={styles.button}
                    onPress={() => uploadDocument(document.id)}
                    title="Upload failed.. Try again?"
                  />
                </View>
              );
            default:
          }
        })()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewport: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  list: {
    flex: 1,
  },
  listItem: {
    width: winSize.width,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: winSize.width - 20,
    height: winSize.height - 136,
    resizeMode: Image.resizeMode.contain,
  },
  stats: {
    width: winSize.width,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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

function mapStateToProps(state) {
  return {
    documents: getScannedDocuments(state),
    stats: getStats(state)
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocumentReviewList);

