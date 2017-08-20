import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'

import {
  StyleSheet,
  View,
  StatusBar,
  ListView,
  Dimensions,
  Button,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

import Scanbot from '../Scanbot/Scanbot';
import config from '../config';
import getStats from '../selectors/getStats';
import getScannedDocuments from '../selectors/getScannedDocuments';
import ReviewBottomTapbar from './ReviewBottomTapbar';
import ReviewStats from './ReviewStats';
import ReviewDocument from './ReviewDocument';

export const winSize = Dimensions.get('window');

class DocumentReviewList extends PureComponent {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `Documents`,
      headerRight: <Button title="Scan" color="white" onPress={() => params.onScanButton()} />,
    headerLeft: <Button title="Back" color="white" onPress={() => { params.user.location === 'NARA' ? navigation.goBack() : navigation.navigate("LocationPicker")}} />
    };
  };

  constructor(props, context) {
    super(props, context);
    const { documents, stats } = this.props;

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      scrollIndex: 0,
      documentCount: documents.length,
      dataSource: dataSource.cloneWithRows([...documents, stats ]),
    };
  };

  componentDidMount = () => {
    // set params so we can use them in `navigationOptions`
    this.props.navigation.setParams({ onScanButton: this.onScanButton, user: this.props.user });
  };

  componentWillReceiveProps(newProps) {
    const { dataSource } = this.state;
    const { documents, stats } = this.props;

    this.setState({
      documentCount: documents.length,
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

    // start uploading all pending documents
    uploadPendingDocuments();

    StatusBar.setHidden(true, true);
    await Scanbot.scan(config.scanOptions, this.onReceiveDocumentScan);
    StatusBar.setHidden(false, true);
  };

  onReceiveDocumentScan = ({ document, error }) => {
    const { addDocument, user } = this.props;

    if(error) {
      alert(error);
      return;
    }

    const isUserAtLocation = user.location === 'NARA' || user.location === 'UN';

    if(document && isUserAtLocation ) {
      addDocument(document)
    }
  };

  onScroll = (event) => {
    const { documentCount } = this.state;

    this.setState({
      // User might have scrolled or bounced before beginning or end
      scrollIndex: Math.min(
        Math.max(documentCount, 0),
        Math.round(Math.max(0, event.nativeEvent.contentOffset.x) / winSize.width)
      )
    });
  };

  onGoHome = () => {
    this.props.completeTask();
    this.props.navigation.navigate('LocationPicker');
  }

  render() {
    const { stats, user, uploadPendingDocuments } = this.props;
    const { scrollIndex, dataSource, documentCount } = this.state;

    return (
      <View style={styles.viewport}>
        <ListView
          ref={(c) => (this._listView = c)}
          enableEmptySections={false}
          dataSource={dataSource}
          style={styles.list}
          onScroll={this.onScroll}
          horizontal={true}
          pagingEnabled={true}
          directionalLockEnabled={true}
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          renderRow={(rowData, _, rowId) => {
            return rowData.id ?
              (
                <View>
                  <ReviewDocument key={rowId} image={rowData.image} />
                  <ReviewBottomTapbar
                    goHome={this.onGoHome}
                    uploadPendingDocuments={uploadPendingDocuments}
                    document={rowData}
                  />
                </View>
              )
              :
              (
                <View>
                  <ReviewStats
                    key={rowId}
                    documentCount={documentCount}
                    stats={stats}
                    onScan={this.onScanButton}
                    practiceMode={user.location === 'practice'}
                  />
                  <ReviewBottomTapbar
                    documentCount={documentCount}
                    goHome={this.onGoHome}
                    uploadPendingDocuments={uploadPendingDocuments}
                    document={rowData}
                  />
                </View>
              )
          }}
        />
      </View>
    );
  }
}

DocumentReviewList.propTypes = {
  documents: PropTypes.arrayOf(
    React.PropTypes.shape({
      image: PropTypes.string.isRequired,
      originalImage: PropTypes.string.isRequired,
      status: PropTypes.string,
      timestamp: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      rotation: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  stats: PropTypes.object.isRequired,
};

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
  error: {
    color: 'red',
  },
});

function mapStateToProps(state) {
  return {
    documents: getScannedDocuments(state),
    stats: getStats(state),
    user: state.user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocumentReviewList);
