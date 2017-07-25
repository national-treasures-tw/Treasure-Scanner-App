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
  Dimensions, Button,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Scanbot from '../Scanbot/Scanbot';

import getScanSession from '../selectors/getScanSession';

import * as actions from '../actions/actions';

export const winSize = Dimensions.get('window');

class DocumentReviewList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    const headerRight = params.scan ? (
      <Button
        title="Next Scan"
        onPress={() => {
          navigation.goBack();
          setTimeout(() => {
            params.scan();
          }, 200);
        }}
      />
    ) : undefined;

    return {
      title: `Documents`,
      headerRight
    };
  };

  constructor(props, context) {
    super(props, context);
    const { documents } = this.props;

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    this.state = {
      error: false,
      scrollIndex: 0,
      documents: documents,
      dataSource: dataSource.cloneWithRows(documents),
    };
  };

  componentWillReceiveProps(newProps) {
    const { params, documents } = this.props;

    if(!params.sessionId) {
      return;
    }

    const { dataSource } = this.state;
    this.setState({
      documents: documents,
      dataSource: dataSource.cloneWithRows(newProps.documents),
    });
  }

  componentDidMount = () => {
    const { documents } = this.props;
    if(documents.length === 0) {
      this.scan();
    }
  };

  onCrop = async () => {
    const { scrollIndex } = this.state;
    const { documents, cropDocument } = this.props;

    try {
      StatusBar.setHidden(true, true);
      // See 'Scanbot/Scanbot.js' for all options and documentation
      const croppedDocument = await Scanbot.crop(documents[scrollIndex]);
      StatusBar.setHidden(false, true);

      if (!croppedDocument || !croppedDocument.image) {
        // user canceled the crop
        return;
      }

      cropDocument(
        documents[scrollIndex].id,
        croppedDocument.image,
        croppedDocument.polygon
      );

    } catch (ex) {
      this.setState({ error: `Scanning Failed ${ex}` });
    }
  };

  onRotate = () => {
    const { scrollIndex } = this.state;
    const { documents, rotateDocument } = this.props;
    rotateDocument(documents[scrollIndex].id);
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
        Math.max(documents.length - 1, 0),
        Math.round(Math.max(0, event.nativeEvent.contentOffset.x) / winSize.width)
      )
    });
  };

  render() {
    const { error, scrollIndex, documents } = this.state;

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
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            style={styles.list}
            onScroll={this.onScroll}
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

function mapStateToProps(state) {
  const params = state.nav.routes[state.nav.index].params || {};
  return {
    params,
    documents: getScanSession(state, params).documents,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocumentReviewList);

