/**
 * @flow
 */

import React from 'react';
import { Button, Text, Platform, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import homeStyles from './styles/HomeStyle'
import { Images, Metrics } from '../Themes';
import { onSignOut } from "../auth";
import MyScanScreen from './SelectLocation';
import MyHomeScreen from './Profile';
import MyAchivementScreen from './Achivement';
import MySettingsScreen from './Settings';
const width = Metrics.screenWidth;

const MyNavScreen = ({ navigation, banner }) => (
  <Image
    resizeMode='cover'
    source={Images.loginBackground}
    style={homeStyles.backgroundImage} >
    <View style={homeStyles.container}>
      <ScrollView style={styles.container}>
        <Button
          onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
          title="Log out"
        />
      </ScrollView>
    </View>
  </Image>
);

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

// const MySettingsScreen = ({ navigation }) => (
//   <MyNavScreen banner="Settings Tab" navigation={navigation} />
// );
//
// MySettingsScreen.navigationOptions = {
//   tabBarLabel: '設定',
//   tabBarIcon: ({ tintColor, focused }) => (
//     <Ionicons
//       name={focused ? 'ios-settings' : 'ios-settings-outline'}
//       size={26}
//       style={{ color: tintColor }}
//     />
//   ),
// };

const SimpleTabs = StackNavigator({
  MyTab: {
    screen: TabNavigator(
      {
        Home: {
          screen: MyHomeScreen,
          path: '',
          navigationOptions: { title: 'Home' }
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
    ),
    navigationOptions: {
      title: '國家寶藏',
      headerStyle: { backgroundColor: 'rgb(35, 29, 11)' },
      headerTitleStyle: { color: '#FFF', fontSize: 18 }
    }
  }
})

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default SimpleTabs;
