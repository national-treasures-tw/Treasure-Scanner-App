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
    backgroundColor: Colors.eosBlack,
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
  badge1: {
    alignSelf: 'auto',
    justifyContent: 'flex-start',
    height: 201,
    width: 147,
  },
  topSection: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: Metrics.doubleBaseMargin,
    // FIXME: w/o a this it renders a big white box
    backgroundColor: 'rgba(0,0,0,0)',
    top: 10
  },
  topBox: {
    width: 236,
    height: 196,
    borderColor: 'rgb(69, 64, 62)',
    borderWidth: 2,
  },
  scrollableContent: {
    width: Metrics.screenWidth
  },
  nameBox: {
    marginLeft: 31,
    marginTop: 15,
    marginBottom: 10
  },
  nameBoxText: {
    fontSize: 36
  },
  levelBoxText: {
    fontSize: 14
  },
  levelBar: {
    flexDirection: 'row'
  },
  levelBar1: {
    height: 8,
    width: 95,
    backgroundColor: 'rgb(245, 166, 35)',
    borderWidth: 1,
    borderColor: 'rgb(69, 64, 62)',
    borderRightWidth: 0
  },
  levelBar2: {
    height: 8,
    width: 54,
    backgroundColor: 'rgb(136, 118, 102)',
    borderWidth: 1,
    borderColor: 'rgb(69, 64, 62)',
    borderLeftWidth: 0
  },
  headingSub: {
    marginLeft: 31
  },
  headingSubText: {
    fontSize: 16
  },
  newsBox: {
    width: '98%',
    margin: 3,
    backgroundColor: 'rgb(90, 84, 82)',
    borderRadius: 3,
    marginBottom: 50
  },
  newsBoxTitle: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 14
  },
  newsBoxItems: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: 'rgb(54, 54, 54)',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(90, 84, 82)'
  },
  newsBoxTitleText: {
    color: '#FFF',
    fontSize: 18
  },
  newsBoxTitleItemText: {
    color: '#FFF',
    fontSize: 17
  },
  rankBox: {
    width: '98%',
    margin: 3,
    backgroundColor: 'rgb(90, 84, 82)',
    borderRadius: 3,
    marginBottom: 10
  },
  rankBoxContent: {
    backgroundColor: 'rgb(54, 54, 54)',
    padding: 14,
  },
  rankItems: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 8
  },
  rankItemName: {
    color: '#FFF',
    fontSize: 15,
    marginRight: 80,
    width: 120
  },
  rankItemNameNumberOne: {
    color: '#FFF',
    fontSize: 15,
    marginRight: 80,
    width: 230
  },
  rankItemScore: {
    color: '#FFF',
    fontSize: 15
  },
  locationImage: {
    width: Metrics.screenWidth,
    flex: 1
  },
  slide: {
    backgroundColor: 'rgb(59, 58, 56)',
    borderColor: 'rgb(243, 180, 70)',
    borderWidth: 2,
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.83,
    left: 80,
    marginRight: 24
  },
  slide3: {
    backgroundColor: 'rgb(59, 58, 56)',
    borderColor: 'rgb(243, 180, 70)',
    borderWidth: 2,
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.83,
    left: 80,
    marginRight: 115
  },
  slideTitle: {
    alignSelf: 'center',
    marginTop: 0,
    width: '100%',
    height: 105,
    padding: 12,
    borderBottomColor: 'rgb(243, 180, 70)',
    borderBottomWidth: 1
  },
  slideTitleText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 14
  },
  slideTitleSubText: {
    color: '#FFF',
    fontSize: 18,
    opacity: 0.8,
    textAlign: 'center'
  },
  slideLogo: {
    alignSelf: 'center',
    width: 165,
    height: 165,
    marginTop: 24,
    marginBottom: 24
  },
  slideLogoUN: {
    alignSelf: 'center',
    width: 165,
    height: 140,
    marginTop: 24,
    marginBottom: 24
  },
  slideBodyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 19,
    color: '#FFF',
    opacity: 0.8
  },
  slideBodyButton: {
    alignSelf: 'center',
    width: 242,
    height: 52,
    backgroundColor: 'rgb(160, 30, 64)',
    marginTop: 24,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(243, 180, 70)'
  },
  slideBodyButton1: {
    alignSelf: 'center',
    width: 242,
    height: 52,
    backgroundColor: 'rgb(160, 30, 64)',
    marginTop: 44,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(243, 180, 70)'
  },
  slideBodyButtonUN: {
    alignSelf: 'center',
    width: 242,
    height: 52,
    backgroundColor: 'rgb(160, 30, 64)',
    marginTop: 49,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(243, 180, 70)'
  },
  slideBodyButtonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 0.3
  },
  slideFootnote: {
    alignSelf: 'center',
    top: -120,
    width: 235,
    backgroundColor: 'transparent'
  },
  slideFootnoteText: {
    fontSize: 16,
    color: 'rgb(69, 64, 62)',
    textAlign: 'center'
  },
  requestorText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 20,
    top: -50,
    left: 150,
    backgroundColor: 'transparent'
  },
  naIdText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 20,
    top: 180,
    left: 150,
    backgroundColor: 'transparent'
  },
  recordIdText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 16,
    top: -220,
    left: -70,
    backgroundColor: 'transparent',
    width: 400
  },
  RGNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 20,
    top: -245,
    left: 10,
    backgroundColor: 'transparent'
  },
  stackAreaText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 20,
    top: -150,
    left: 12,
    backgroundColor: 'transparent'
  },
  rowNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 20,
    top: -90,
    left: 14,
    backgroundColor: 'transparent'
  },
  compartmentText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 20,
    top: 30,
    left: 20,
    backgroundColor: 'transparent'
  },
  shelfNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 20,
    top: 145,
    left: 22,
    backgroundColor: 'transparent'
  },
  readyForTaskButton: {
    top: 150,
    width: 141,
    height: 40,
    backgroundColor: 'rgb(54, 54, 54)',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 18,
  },
  readyForTaskButtonText: {
    fontSize: 24,
    color: '#FFF'
  }
})
