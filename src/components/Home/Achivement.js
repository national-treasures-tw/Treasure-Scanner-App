import React from 'react';
import { Text, ScrollView, View, Image, StyleSheet } from 'react-native';
import homeStyles from './styles/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images, Metrics } from '../Themes';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';
import UserInfoBox from './UserInfoBox';
import { levelLabelCalculator } from '../../utils/levelHelper';
const width = Metrics.screenWidth;

class MyAchivementScreen extends React.Component {
  render() {
    const { details } = this.props.user;
    const levelNumber = details && parseInt(levelLabelCalculator(details.info.totalScore));
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
                <View style={homeStyles.badgeItems}>
                  <Text style={homeStyles.badgeItemName}>等級徽章</Text>
                </View>
                <View style={homeStyles.badgesDisplay}>
                  <Image source={Images.badge1} style={homeStyles.rankBadgeFirstOne} />
                  {levelNumber > 1 ?  <Image source={Images.badge2} style={homeStyles.rankBadge} /> : <View style={homeStyles.badgePlaceholder} />}
                  {levelNumber > 2 ?  <Image source={Images.badge3} style={homeStyles.rankBadge} /> : <View style={homeStyles.badgePlaceholder} />}
                  <View style={homeStyles.badgePlaceholder} />
                  <View style={homeStyles.badgePlaceholder} />
                </View>
                <View style={homeStyles.badgeItems}>
                  <Text style={homeStyles.badgeItemName}>場館徽章</Text>
                </View>
                <View style={homeStyles.badgesDisplay}>
                  <Image source={Images.badge1} style={homeStyles.rankBadgeFirstOne} />
                  <View style={homeStyles.badgePlaceholder} />
                  <View style={homeStyles.badgePlaceholder} />
                  <View style={homeStyles.badgePlaceholder} />
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
