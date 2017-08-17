import React from 'react';
import { Text, ScrollView, View, Image, StyleSheet } from 'react-native';
import homeStyles from './styles/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images, Metrics } from '../Themes';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { getToken } from '../auth';
import { levelWidthCalculator, levelLabelCalculator } from '../../utils/levelHelper';
import UserInfoBox from './UserInfoBox';
const width = Metrics.screenWidth;

class MyAchivementScreen extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    const initTime = new Date().getTime();
    if (!user.details && user.token) {
      this.fetchUserInfo(user.token)
    } else if (!user.details) {
      getToken()
      .then((token) => {
        if (token) {
          this.fetchUserInfo(token);
        }
      })
    }
  }

  fetchUserInfo = (token) => {
    fetch(`https://76k76zdzzl.execute-api.us-east-1.amazonaws.com/stage/user?token=${token}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(fetchRes => fetchRes.json())
    .then((res) => {
      console.log(res);
      this.props.receiveUserDetails(res.user);
    });
  }

  render() {
    const { details } = this.props.user;

    return (
      <Image
        resizeMode='cover'
        source={Images.loginBackground}
        style={homeStyles.backgroundImage} >
        <View style={homeStyles.container}>
          <UserInfoBox details={details} />
          <ScrollView style={homeStyles.scrollableContent}>
            <View style={homeStyles.rankBox}>
              <View style={homeStyles.newsBoxTitle}>
                <Text style={homeStyles.newsBoxTitleText}>我的成就獎章</Text>
              </View>
              <View style={homeStyles.rankBoxContent}>
                <View style={homeStyles.rankItems}>
                  <Text style={homeStyles.rankItemName}>等級徽章</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Image>
    );
  }
}

MyAchivementScreen.navigationOptions = {
  tabBarLabel: '成就',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-ribbon' : 'ios-ribbon-outline'}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAchivementScreen);
