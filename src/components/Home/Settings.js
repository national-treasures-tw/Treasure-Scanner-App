import React from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import homeStyles from './styles/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images, Metrics } from '../Themes';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { onSignOut } from '../auth';


class MySettingsScreen extends React.Component {
  onSignout = () => {
    const { navigation, signOut } = this.props;
    onSignOut()
    .then(() => {
      signOut();
      navigation.navigate("SignedOut")
    })
  }

  render() {
    const { details } = this.props.user;

    return (
      <Image
        resizeMode='cover'
        source={Images.loginBackground}
        style={homeStyles.backgroundImage} >
        <View style={homeStyles.container}>
          <TouchableOpacity onPress={this.onSignout} style={homeStyles.slideBodyButton}>
            <Text style={homeStyles.slideBodyButtonText}>登出</Text>
          </TouchableOpacity>
        </View>
      </Image>
    );
  }
}

MySettingsScreen.navigationOptions = {
  tabBarLabel: '設定',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-settings' : 'ios-settings-outline'}
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

export default connect(mapStateToProps, mapDispatchToProps)(MySettingsScreen);
