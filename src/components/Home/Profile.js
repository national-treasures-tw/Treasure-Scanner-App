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
const width = Metrics.screenWidth;

class MyHomeScreen extends React.Component {
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
    const seasonString = `season${new Date().getFullYear()}${Math.floor(new Date().getMonth() / 3) + 1}`;
    const ranking = details && details.ranking.sort((a, b) => a[seasonString] < b[seasonString]).map(member => (
      <View style={homeStyles.rankItems} key={member.nickname + member[seasonString]}>
        <Text style={homeStyles.rankItemName}>{member.nickname}</Text>
        <Text style={homeStyles.rankItemScore}>{member[seasonString]}</Text>
      </View>
    ));
    const levelTotalWidth = 144;
    const levelWidth = details && levelWidthCalculator(details.info[seasonString], levelTotalWidth)
    const barStyle = StyleSheet.create({
      bar1: {
        height: 8,
        width: details ? levelWidth : 0,
        backgroundColor: 'rgb(245, 166, 35)',
        borderWidth: 1,
        borderColor: 'rgb(69, 64, 62)',
        borderRightWidth: 0
      },
      bar2: {
        height: 8,
        width: details ? levelTotalWidth - levelWidth : levelTotalWidth,
        backgroundColor: 'rgb(136, 118, 102)',
        borderWidth: 1,
        borderColor: 'rgb(69, 64, 62)',
        borderLeftWidth: 0
      }
    });

    return (
      <Image
        resizeMode='cover'
        source={Images.loginBackground}
        style={homeStyles.backgroundImage} >
        <View style={homeStyles.container}>
          <View style={[homeStyles.topSection, { width }]}>
            <Image source={Images.badge1} style={homeStyles.badge1} />
            <View style={homeStyles.topBox}>
              <View style={homeStyles.nameBox}>
                <Text style={homeStyles.nameBoxText}>{details ? details.info.nickname : 'Fetching...'}</Text>
              </View>
              {/* Levels: 1 (< 500), 2 (500 - 5000), 3 (> 5000) */}
              <View style={homeStyles.nameBox}>
                <Text style={homeStyles.levelBoxText}>Level. {details && levelLabelCalculator(details.info[seasonString])}</Text>
                <View style={homeStyles.levelBar}>
                  <View style={barStyle.bar1}></View>
                  <View style={barStyle.bar2}></View>
                </View>
              </View>
              <View style={homeStyles.headingSub}>
                <Text style={homeStyles.headingSubText}>本季排名：{details && details.ranking.length + 1}</Text>
              </View>
              <View style={homeStyles.headingSub}>
                <Text style={homeStyles.headingSubText}>貢獻寶藏總數：{details && details.info.totalScore}</Text>
              </View>
              <View style={homeStyles.headingSub}>
                <Text style={homeStyles.headingSubText}>國家寶藏總數：{details && details.totalCount}</Text>
              </View>
            </View>
          </View>
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
