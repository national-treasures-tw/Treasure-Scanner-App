// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: Metrics.screenWidth,
    height: Metrics.navBarHeight,
    backgroundColor: Colors.eosBlack
  },
  backgroundImage: {
    top: 0,
    left: 0,
    right: 0,
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.eosBlack
  },
  container: {
    marginTop: Metrics.navBarHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // flexDirection: 'column',
    //     justifyContent: 'center',
    // alignItems: 'center'
  },
  eosLogo: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 147,
    width: 147
  },
  tntName: {
    alignSelf: 'center',
  },
  topLogo: {
    flex: 0.18,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: Metrics.doubleBaseMargin,
    // FIXME: w/o a this it renders a big white box
    backgroundColor: 'rgba(0,0,0,0)'
  },
  content: {
    flex: 0.82,
    paddingTop: Metrics.doubleBaseMargin,
    marginTop: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  caption: {
    color: Colors.dustyOrange,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    ...Fonts.style.description
  }
})
