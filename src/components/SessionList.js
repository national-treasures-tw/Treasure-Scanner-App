import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions, Button,
} from 'react-native';
import getScanSessions from '../selectors/getScanSessions';
import getStatusLabelForStatus from '../selectors/getStatusLabelForStatus';
import * as actions from '../actions/actions';
import scanDocuments from '../Scanbot/scanDocuments';

export const winSize = Dimensions.get('window');

class SessionList extends Component {

  justAddedSession = false;

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `Scans`,
      headerRight: (
        <Button
          title="Scan"
          onPress={() => params.scan()}
        />
      ),
    }
  };

  constructor(props, context) {
    super(props, context);

    const { sessions } = props;

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(sessions),
    };
  };

  componentDidMount = () => {
    // set params so we can use them in `navigationOptions`
    this.props.navigation.setParams({ scan: this.scan })
  };

  componentWillReceiveProps(newProps) {
    const { dataSource } = this.state;
    const { sessions, navigation } = newProps;

    // if a new session is added, navigate to DocumentReviewList
    if(sessions.length > this.props.sessions.length) {
      const newSession = sessions[sessions.length - 1];
      // wait just a little bit so the user sees the new scan appearing
      setTimeout(() => {
        this.setState({
          dataSource: dataSource.cloneWithRows(sessions),
        });

        // and just a little more we navigate away
        setTimeout(() => {
          navigation.navigate('DocumentReviewList', {
            sessionId: newSession.id,
            scan: this.scan,
          });
        }, 200);
      }, 200);
    }
  }

  scan = async () => {
    const { addScanSession } = this.props;
    try {
      let documents = await scanDocuments();
      if(documents) {
        addScanSession(documents);
      }
    } catch (ex) {
      alert('Scanning failed', ex);
    }
  };

  render() {
    const { dataSource } = this.state;

    return (
      <View style={styles.viewport}>

        {dataSource.getRowCount() > 0 && (
          <ListView
            dataSource={this.state.dataSource}
            style={styles.list}
            directionalLockEnabled={true}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={true}
            renderRow={this.renderRow}
          />
        )}

        {dataSource.getRowCount() === 0 && (
          <View style={styles.errorContainer}>
            <Text style={styles.info}>Your scans will appear here</Text>
          </View>
        )}
      </View>
    );
  }

  renderRow = (session, index) => {
    const { navigation: { navigate } } = this.props;

    const date = new Date(session.timestamp * 1000);
    return (
      <View style={styles.listItem} key={index}>
        <View>
          <Text>
            {date.getFullYear()}-{date.getMonth()}-{date.getDate()}
          </Text>
          <Text>
            {getStatusLabelForStatus(session.documents.status)}
          </Text>
        </View>

        <Button
          onPress={() => navigate('DocumentReviewList', { sessionId: session.id })}
          title={`${session.documents.length} page${session.documents.length === 1 ? '' : 's'}`}
        />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    flex: 1,
    width: winSize.width,
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 5,
    justifyContent: 'space-around'
  },
  info: {
    flex: 1,
    textAlign: 'center',
    color: 'gray'
  }
});

function mapStateToProps(state) {
  return {
    sessions: getScanSessions(state),
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SessionList);
