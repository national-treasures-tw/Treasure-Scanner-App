import React from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, WebView } from 'react-native';
import homeStyles from './styles/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images, Metrics } from '../Themes';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { onSignOut } from '../auth';


class MyTutorialScreen extends React.Component {
  onWebview = () => {
    const { navigation } = this.props;

    navigation.navigate("Webview");
  }

  render() {
    const { details } = this.props.user;

    return (
      <WebView
        source={{uri: 'https://paper.dropbox.com/doc/iNmQvK5cd4ny198x1Kwc8'}}
        style={{marginTop: 20}}
      />
    );
  }
}

MyTutorialScreen.navigationOptions = {
  tabBarLabel: '指南',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-book' : 'ios-book-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyTutorialScreen);
