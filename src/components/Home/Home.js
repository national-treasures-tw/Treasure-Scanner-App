/**
 * @flow
 */

import React from 'react';
import { Button, Text, Platform, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import homeStyles from './styles/HomeStyle'
import { Images, Metrics } from '../Themes';
import { onSignOut } from "../auth";
import MyScanScreen from './SelectLocation';
import MyHomeScreen from './Profile';
import MyAchivementScreen from './Achivement';
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

/*
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
*/
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
