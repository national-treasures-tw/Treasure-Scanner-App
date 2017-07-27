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
      headerRight: <Button title="Scan" onPress={() => params.onScanButton()} />,
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
      dataSource: dataSource.cloneWithRows([...documents, stats ]),
    };
  };

  componentDidMount = () => {
    // set params so we can use them in `navigationOptions`
    this.props.navigation.setParams({ onScanButton: this.onScanButton });
  };

  componentWillReceiveProps(newProps) {
    const { dataSource } = this.state;
    const { documents, stats } = this.props;

    this.setState({
      dataSource: dataSource.cloneWithRows([...newProps.documents, stats ]),
    });

    if(newProps.documents.length > documents.length) {
      if(this._listView) {
        this._listView.scrollTo({ x: 0, y: 0 });
      }
    }
  }

  onScanButton = async () => {
    const { uploadPendingDocuments } = this.props;

    StatusBar.setHidden(true, true);

    // start uploading all pending documents
    uploadPendingDocuments();

    // See 'Scanbot/Scanbot.js' for all options and documentation
    await Scanbot.scan(config.scanOptions, this.onReceiveDocumentScan);
    StatusBar.setHidden(false, true);
  };

  onReceiveDocumentScan = ({ document, error }) => {
    const { addDocument } = this.props;

    if(error) {
      alert(error);
      return;
    }

    if(document) {
      addDocument(document)
    }
  };

  onCropButton = async () => {
    const { scrollIndex } = this.state;
    const { cropDocument } = this.props;

    const doc = this.getRow(scrollIndex);
    try {
      StatusBar.setHidden(true, true);
      // See 'Scanbot/Scanbot.js' for all options and documentation
      const croppedDocument = await Scanbot.crop(doc);
      StatusBar.setHidden(false, true);

      if (doc.image === croppedDocument.image) {
        // user canceled the crop
        return;
      }

      cropDocument(
        doc.id,
        croppedDocument.image,
        croppedDocument.polygon
      );

    } catch (ex) {
      alert('Crop failed..', ex);
    }
  };

  onRotateButton = async () => {
    const { scrollIndex } = this.state;
    const { rotateDocument } = this.props;

    const doc = this.getRow(scrollIndex);
    try {
      // See 'Scanbot/Scanbot.js' for all options and documentation
      rotateDocument(
        doc.id,
        await Scanbot.rotate(doc.image),
      );
    } catch (ex) {
      alert('Rotating failed..', ex);
    }
  };

  onDeleteButton = () => {
    const { scrollIndex } = this.state;
    const { deleteDocument } = this.props;
    deleteDocument(this.getRow(scrollIndex).id);
  };

  onScroll = (event) => {
    const { dataSource } = this.state;

    this.setState({
      // User might have scrolled or bounced before beginning or end
      scrollIndex: Math.min(
        Math.max(dataSource.getRowCount() - 1, 0),
        Math.round(Math.max(0, event.nativeEvent.contentOffset.x) / winSize.width)
      )
    });
  };

  getRow = (index) => {
    const { dataSource } = this.state;
    return dataSource.getRowData(0, index);
  };

  render() {
    const { uploadDocument } = this.props;
    const { scrollIndex, dataSource } = this.state;

    const documentCount = dataSource.getRowCount();
    const document = dataSource.getRowData(0, scrollIndex);

    return (
      <View style={styles.viewport}>

        {documentCount > 0 && (
          <ListView
            ref={(c) => (this._listView = c)}
            enableEmptySections={true}
            dataSource={dataSource}
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

        {documentCount === 0 && (
          <View style={styles.infoContainer}>
            <Text style={styles.info}>Your scanned documents will appear here</Text>
          </View>
        )}

        {documentCount > 0 && scrollIndex + 1 === documentCount && (
          <View style={styles.bottomTabBar}>
            <Button
              style={styles.button}
              onPress={() => {}}
              title="Stats"
              disabled
            />
          </View>
        )}

        {document && document.id && (() => {
          switch (document.status) {
            case Status.UNDEFINED:
              return (
                <View style={styles.bottomTabBar}>
                  <Button
                    disabled={!document.originalImage || document.isNotDocument}
                    style={styles.button}
                    onPress={() => this.onCropButton()}
                    title="Crop"
                  />
                  <Button
                    style={styles.button}
                    onPress={() => this.onRotateButton()}
                    title="Rotate"
                  />
                  <Button
                    style={styles.button}
                    onPress={this.onDeleteButton}
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

