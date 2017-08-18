/**
 * @flow
 */

import { TabNavigator, StackNavigator } from 'react-navigation';
import MyScanScreen from './SelectLocation';
import MyHomeScreen from './Profile';
import MyAchivementScreen from './Achivement';
import MySettingsScreen from './Settings';
import MyTutorialScreen from './Tutorial';


const MainTabs = StackNavigator({
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
          screen: MyTutorialScreen,
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

export default MainTabs;
