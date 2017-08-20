import React from 'react';
import { Text, ScrollView, View, Image, NetInfo, TouchableOpacity } from 'react-native';
import homeStyles from './styles/HomeStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images, Metrics } from '../Themes';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';
const width = Metrics.screenWidth;

class MyScanScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    };
  }

  componentDidMount() {
    NetInfo.fetch().then((reach) => {
      console.log('inside net info');
      console.log('Initial: ' + reach);
      if (reach !== 'wifi') {
        alert('請連上Wifi再繼續進行下一步，因為我們會大量使用網路上傳翻拍');
      }
    });
  }
  // location: 'NARA' or 'UN'
  onReadyForTask = (location) => {
    const { selectLocation, navigation } = this.props;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const siteCoordinates = {
          NARA: { latitude: 39.0006809, longitude: -76.9605249 },
          UN: { latitude: 40.7517766, longitude: -73.9702365 }
        };
        // proximity of 0.01 in latitude is about 7 miles in distance
        // so here we are checking if the user is within 7 miles of the selected location
        const proximity = { NARA: 0.01, UN: 0.01 } ;
        const isCloseBy = latitude < siteCoordinates[location].latitude + proximity[location]
          && latitude > siteCoordinates[location].latitude - proximity[location]
          && longitude > siteCoordinates[location].longitude - proximity[location]
          && longitude < siteCoordinates[location].longitude + proximity[location];
        const locationString = location === 'NARA' ? 'National Archive' : 'United Nations';
        if (isCloseBy) {
          alert(`您的位置不在 ${locationString} 範圍內，請使用練習模式`);
        } else {
          selectLocation(location);
          if (location === 'NARA') {
            navigation.navigate("Task");
          } else if (location === 'UN') {
            // 8/2017 for UN go directly to scan view because dispatcher for UN is not ready
            navigation.navigate("Scan");
          }
        }
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  onReadyForPractice = () => {
    const { selectLocation, navigation } = this.props;
    selectLocation('practice');
    navigation.navigate('Scan');
  }

  render() {
    return (
      <Image
        resizeMode='cover'
        source={Images.loginBackground}
        style={homeStyles.backgroundImage} >
        <ScrollView style={homeStyles.selectLocationContainer} horizontal alwaysBounceHorizontal={false} centerContent contentOffset={{ x: width * 0.82, y: 0}} >
            <View style={homeStyles.slide} >
              <View style={homeStyles.slideTitle}>
                <Text style={homeStyles.slideTitleText}>練習翻拍</Text>
                <Text style={homeStyles.slideTitleSubText}>(隨時隨地)  </Text>
              </View>
              <View style={homeStyles.slideBody}>
                <Image source={Images.badge1} style={homeStyles.slideLogo} />
                <TouchableOpacity style={homeStyles.slideBodyButton1} onPress={this.onReadyForPractice}>
                  <Text style={homeStyles.slideBodyButtonText}>開始練習</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={homeStyles.slide} >
              <View style={homeStyles.slideTitle}>
                <Text style={homeStyles.slideTitleText}>National Archives and Records Administration</Text>
                <Text style={homeStyles.slideTitleSubText}>(Washington D.C.) </Text>
              </View>
              <View style={homeStyles.slideBody}>
                <Image source={Images.naraImg} style={homeStyles.slideLogo} />
                <Text style={homeStyles.slideBodyText}>已尋獲寶藏：2397</Text>
                <TouchableOpacity style={homeStyles.slideBodyButton} onPress={() => this.onReadyForTask('NARA')}>
                  <Text style={homeStyles.slideBodyButtonText}>取得任務內容</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={homeStyles.slide3} >
              <View style={homeStyles.slideTitle}>
                <Text style={homeStyles.slideTitleText}>United Nations Records Archive</Text>
                <Text style={homeStyles.slideTitleSubText}>(New York City) </Text>
              </View>
              <View style={homeStyles.slideBody}>
                <Image source={Images.unImg} style={homeStyles.slideLogoUN} />
                <Text style={homeStyles.slideBodyText}>已尋獲寶藏：1397</Text>
                <TouchableOpacity style={homeStyles.slideBodyButtonUN} onPress={() => this.onReadyForTask('UN')}>
                  <Text style={homeStyles.slideBodyButtonText}>取得任務內容</Text>
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
        <View style={homeStyles.slideFootnote}>
          <Text style={homeStyles.slideFootnoteText}>
            需要驗證所在位置，若不在此場館請往左選擇「練習翻拍」
          </Text>
        </View>
      </Image>
    );
  }
}

MyScanScreen.navigationOptions = {
  tabBarLabel: '開始任務',
  tabBarIcon: ({ tintColor, focused }) => (
    <Ionicons
      name={focused ? 'ios-camera' : 'ios-camera-outline'}
      size={26}
      style={{ color: tintColor }}
    />
  ),
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(null, mapDispatchToProps)(MyScanScreen);
