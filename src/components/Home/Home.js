/**
 * @flow
 */

import React from 'react';
import { Button, Text, Platform, ScrollView, StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import homeStyles from './styles/HomeStyle'
import { Images, Metrics } from '../Themes';
const width = Metrics.screenWidth;

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView style={styles.container}>
    <Text>{banner}</Text>
    <Button
      onPress={() => navigation.navigate('Home')}
      title="Go to home tab"
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
        </View>
      </View>
      <ScrollView style={homeStyles.scrollableContent}>
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
  tabBarLabel: 'Home',
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
  tabBarLabel: 'Achivements',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-ribbon' : 'ios-ribbon-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

class MyScanScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Swiper showsButtons style={homeStyles.wrapper} height={240}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: -23, left: null, right: 10
          }} loop>
          <View style={homeStyles.slide} title={<Text numberOfLines={1}>翻拍練習</Text>}>
            <Image resizeMode='stretch' style={homeStyles.locationImage} source={Images.scanImg} />
          </View>
          <View style={homeStyles.slide} title={<Text numberOfLines={1}>National Archives and Records Administration</Text>}>
            <Image resizeMode='stretch' style={homeStyles.locationImage} source={Images.naraImg} />
          </View>
          <View style={homeStyles.slide} title={<Text numberOfLines={1}>United Nations Records Management</Text>}>
            <Image resizeMode='stretch' style={homeStyles.locationImage} source={Images.unImg} />
          </View>
        </Swiper>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

MyScanScreen.navigationOptions = {
  tabBarLabel: 'Start Task',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-camera' : 'ios-camera-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MyProfileScreen = ({ navigation }) => (
  <Image
    resizeMode='cover'
    source={Images.requestFormImg}
    style={homeStyles.backgroundImage} >
    <View style={homeStyles.container}>
      <Text style={homeStyles.requestorText}>YuCheng Lin</Text>
      <Text style={homeStyles.naIdText}>021755</Text>
      <Text style={homeStyles.RGNumberText}>59</Text>
      <Text style={homeStyles.stackAreaText}>250</Text>
      <Text style={homeStyles.rowNumberText}>062</Text>
      <Text style={homeStyles.compartmentText}>007</Text>
      <Text style={homeStyles.shelfNumberText}>01 -></Text>
      <Text style={homeStyles.recordIdText}>{`
        Entry A1-1263-B
        International Cooperation Admin Deputy Directors
        Box 1-20
      `}</Text>
    </View>
  </Image>
);

MyProfileScreen.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-person' : 'ios-person-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Tab" navigation={navigation} />
);

MySettingsScreen.navigationOptions = {
  tabBarLabel: 'Settings',
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
    Profile: {
      screen: MyProfileScreen,
      path: 'profile',
    },
    Scan: {
      screen: MyScanScreen,
      path: 'scan',
    },
    Archivement: {
      screen: MyAchivementScreen,
      path: 'achivement',
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
