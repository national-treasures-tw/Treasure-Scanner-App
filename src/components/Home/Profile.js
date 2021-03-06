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
import { userInfoUrl } from '../../env';

const width = Metrics.screenWidth;


class MyHomeScreen extends React.Component {
  componentDidMount() {
    const { user, signOut, navigation } = this.props;
    const initTime = new Date().getTime();
    if (user.token) {
      this.fetchUserInfo(user.token)
    } else if (!user.details) {
      getToken()
      .then((token) => {
        console.log(token);
        if (token) {
          this.fetchUserInfo(token);
        }
      })
    }
  }

  fetchUserInfo = (token) => {
    const { signOut, navigation } = this.props;
    fetch(`${userInfoUrl}?token=${token}`, {
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
      if (res.success) {
        this.props.receiveUserDetails(res.user);
      } else {
        signOut();
        navigation.navigate("SignedOut")
      }
    });
  }

  render() {
    const { details } = this.props.user;
    const seasonString = `season${new Date().getFullYear()}${Math.floor(new Date().getMonth() / 3) + 1}`;
    const ranking = details && details.ranking
      .sort((a, b) => a[seasonString] < b[seasonString] ? 1 : -1)
      .filter((usr, i) => !!usr[seasonString] && i < 10)
      .map((member, index) => (
      <View style={homeStyles.rankItems} key={member.nickname + member[seasonString]}>
        <Text style={member.nickname === details.info.nickname ? homeStyles.rankItemMyName : homeStyles.rankItemName}>{`${index + 1}.  ${member.nickname}`}</Text>
        <Text style={member.nickname === details.info.nickname ? homeStyles.rankItemMyScore : homeStyles.rankItemScore}>{member[seasonString]}</Text>
      </View>
    ));

    return (
      <Image
        resizeMode='cover'
        source={Images.loginBackground}
        style={homeStyles.backgroundImage} >
        <View style={homeStyles.container}>
          <UserInfoBox details={details} />
          <ScrollView style={homeStyles.scrollableContent} bounces>
            <View style={homeStyles.rankBox}>
              <View style={homeStyles.newsBoxTitle}>
                <Text style={homeStyles.newsBoxTitleText}>本季排名</Text>
              </View>
              <View style={homeStyles.rankBoxContent}>
                {ranking && (ranking.length > 0 ? ranking : (
                  <View style={homeStyles.rankItems}>
                    <Text style={homeStyles.rankItemNameNumberOne}>Wow, it looks like you are #1</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={homeStyles.newsBox}>
              <View style={homeStyles.newsBoxTitle}>
                <Text style={homeStyles.newsBoxTitleText}>寶藏速報</Text>
              </View>
              <View style={homeStyles.newsBoxItems}>
                <Text style={homeStyles.newsBoxTitleItemText}>聯合國第一小隊 8/21 10am 在 UN檔案室 門口集合</Text>
              </View>
              <View style={homeStyles.newsBoxItems}>
                <Text style={homeStyles.newsBoxTitleItemText}>馬里蘭第一、第二小隊 8/24 10am 在 NARA 正門集合</Text>
              </View>
              <View style={homeStyles.newsBoxItems}>
                <Text style={homeStyles.newsBoxTitleItemText}>g0v 獎助金專案「遺落在世界的國家寶藏」接連上自由時報頭版和 …</Text>
              </View>
              <View style={homeStyles.newsBoxItems}>
                <Text style={homeStyles.newsBoxTitleItemText}>國家寶藏在開放文化基金會舉辦的Civic Tech Fest進行結案報告</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Image>
    );
  }
}

MyHomeScreen.navigationOptions = {
  tabBarLabel: '首頁',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-home' : 'ios-home-outline'}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyHomeScreen);
