/**
 * @flow
 */

import React from 'react';
import { Button, Text, Platform, ScrollView, StyleSheet, View, Image, NetInfo, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import homeStyles from './styles/HomeStyle'
import { Images, Metrics } from '../Themes';
import { onSignOut } from "../auth";
import MyScanScreen from './SelectLocation';
const width = Metrics.screenWidth;

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView style={styles.container}>
    <Text>{banner}</Text>
    <Button
      onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
      title="Log out"
    />
    <Button
      onPress={() => navigation.navigate('Settings')}
      title="Go to settings tab"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <Image
    resizeMode='cover'
    source={Images.loginBackground}
    style={homeStyles.backgroundImage} >
    <View style={homeStyles.container}>
      <View style={[homeStyles.topSection, { width }]}>
        <Image source={Images.badge1} style={homeStyles.badge1} />
        <View style={homeStyles.topBox}>
          <View style={homeStyles.nameBox}>
            <Text style={homeStyles.nameBoxText}>蕭A</Text>
          </View>
          {/* Levels: 1 (< 500), 2 (500 - 5000), 3 (> 5000) */}
          <View style={homeStyles.nameBox}>
            <Text style={homeStyles.levelBoxText}>Level. 1</Text>
            <View style={homeStyles.levelBar}>
              <View style={homeStyles.levelBar1}></View>
              <View style={homeStyles.levelBar2}></View>
            </View>
          </View>
          <View style={homeStyles.headingSub}>
            <Text style={homeStyles.headingSubText}>本季排名：121</Text>
          </View>
          <View style={homeStyles.headingSub}>
            <Text style={homeStyles.headingSubText}>貢獻寶藏總數：54</Text>
          </View>
          <View style={homeStyles.headingSub}>
            <Text style={homeStyles.headingSubText}>國家寶藏總數：121972</Text>
          </View>
        </View>
      </View>
      <ScrollView style={homeStyles.scrollableContent} bounces>
        <View style={homeStyles.rankBox}>
          <View style={homeStyles.newsBoxTitle}>
            <Text style={homeStyles.newsBoxTitleText}>本季排名</Text>
          </View>
          <View style={homeStyles.rankBoxContent}>
            <View style={homeStyles.rankItems}>
              <Text style={homeStyles.rankItemName}>小風</Text>
              <Text style={homeStyles.rankItemScore}>3523</Text>
            </View>
            <View style={homeStyles.rankItems}>
              <Text style={homeStyles.rankItemName}>美東金平</Text>
              <Text style={homeStyles.rankItemScore}>2123</Text>
            </View>
            <View style={homeStyles.rankItems}>
              <Text style={homeStyles.rankItemName}>憨哥</Text>
              <Text style={homeStyles.rankItemScore}>1023</Text>
            </View>
            <View style={homeStyles.rankItems}>
              <Text style={homeStyles.rankItemName}>Robin</Text>
              <Text style={homeStyles.rankItemScore}>523</Text>
            </View>
            <View style={homeStyles.rankItems}>
              <Text style={homeStyles.rankItemName}>蕭Ａ</Text>
              <Text style={homeStyles.rankItemScore}>323</Text>
            </View>
          </View>
        </View>
        <View style={homeStyles.newsBox}>
          <View style={homeStyles.newsBoxTitle}>
            <Text style={homeStyles.newsBoxTitleText}>寶藏速報</Text>
          </View>
          <View style={homeStyles.newsBoxItems}>
            <Text style={homeStyles.newsBoxTitleItemText}>第一小隊 7/10 8am 在 NARA 正門集合</Text>
          </View>
          <View style={homeStyles.newsBoxItems}>
            <Text style={homeStyles.newsBoxTitleItemText}>g0v 獎助金專案「遺落在世界的國家寶藏」接連上自由時報頭版和 …</Text>
          </View>
          <View style={homeStyles.newsBoxItems}>
            <Text style={homeStyles.newsBoxTitleItemText}>國家寶藏在開放文化基金會舉辦的Civic Tech Fest進行結案報告</Text>
          </View>
          <View style={homeStyles.newsBoxItems}>
            <Text style={homeStyles.newsBoxTitleItemText}>第一小隊 7/10 8am 在 NARA 正門集合</Text>
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

const MyAchivementScreen = ({ navigation }) => (
  <Image
    resizeMode='cover'
    source={Images.loginBackground}
    style={homeStyles.backgroundImage} >
    <View style={homeStyles.container}>
      <View style={[homeStyles.topSection, { width: Metrics.screenWidth }]}>
        <Image source={Images.badge1} style={homeStyles.badge1} />
        <View style={homeStyles.topBox}>
        </View>
      </View>
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

class MyProfileScreen extends React.Component {
  render() {
    return (
      <MyNavScreen banner="Settings Tab" navigation={this.props.navigation} />
    )}
}

MyProfileScreen.navigationOptions = {
  tabBarLabel: '指南',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-book' : 'ios-book-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Tab" navigation={navigation} />
);

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

const SimpleTabs = TabNavigator(
  {
    Home: {
      screen: MyHomeScreen,
      path: '',
    },
    Archivement: {
      screen: MyAchivementScreen,
      path: 'achivement',
    },
    LocationPicker: {
      screen: MyScanScreen,
      path: 'scan',
    },
    Tutorial: {
      screen: MyProfileScreen,
      path: 'tutorial',
    },
    Settings: {
      screen: MySettingsScreen,
      path: 'settings',
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      inactiveBackgroundColor: 'rgb(46, 43, 41)',
      activeBackgroundColor: 'rgb(170, 3, 23)',
    },
  }
);

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default SimpleTabs;
