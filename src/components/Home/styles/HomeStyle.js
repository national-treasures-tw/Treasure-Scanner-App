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
    marginTop: 5,
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
    height: Metrics.screenHeight * 0.3,
    width: Metrics.screenWidth * 0.39,
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
    width: Metrics.screenWidth * 0.60,
    height: 196,
    borderColor: 'rgb(69, 64, 62)',
    borderWidth: 2,
  },
  scrollableContent: {
    width: Metrics.screenWidth
  },
  nameBox: {
    marginLeft: Metrics.screenWidth * 0.081,
    marginTop: 15,
    marginBottom: 10
  },
  nameBoxText: {
    fontSize: 32
  },
  nameBoxTextSmall: {
    fontSize: 23
  },
  levelBoxText: {
    fontSize: 14
  },
  levelBar: {
    flexDirection: 'row'
  },
  headingSub: {
    marginLeft: Metrics.screenWidth * 0.081
  },
  headingSubText: {
    fontSize: 16
  },
  newsBox: {
    width: '98%',
    margin: 3,
    backgroundColor: 'rgb(90, 84, 82)',
    borderRadius: 3,
    marginBottom: 150
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
  rankItemMyName: {
    color: 'rgb(245, 166, 35)',
    fontSize: 15,
    marginRight: 80,
    width: 120
  },
  rankBoxContent: {
    backgroundColor: 'rgb(54, 54, 54)',
    padding: 14,
  },
  rankItemNameNumberOne: {
    color: '#FFF',
    fontSize: 15,
    marginRight: 80,
    width: 230
  },
  rankItemScore: {
    color: '#FFF',
    fontSize: 15,
    width: 60
  },
  rankItemMyScore: {
    color: 'rgb(245, 166, 35)',
    fontSize: 15,
    width: 60
  },
  locationImage: {
    width: Metrics.screenWidth,
    flex: 1
  },
  selectLocationContainer: {
    marginTop: Metrics.screenHeight * 0.03
  },
  slide: {
    backgroundColor: 'rgb(59, 58, 56)',
    borderColor: 'rgb(243, 180, 70)',
    borderWidth: 2,
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.70,
    left: 80,
    marginRight: 24
  },
  slide3: {
    backgroundColor: 'rgb(59, 58, 56)',
    borderColor: 'rgb(243, 180, 70)',
    borderWidth: 2,
    width: Metrics.screenWidth * 0.7,
    height: Metrics.screenHeight * 0.70,
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
    width: Metrics.screenWidth * 0.52,
    height: Metrics.screenHeight * 0.3,
    marginTop: Metrics.screenHeight * 0.04,
    marginBottom: Metrics.screenHeight * 0.02
  },
  slideLogoUN: {
    alignSelf: 'center',
    width: Metrics.screenWidth * 0.52,
    height: Metrics.screenHeight * 0.25,
    marginTop: Metrics.screenHeight * 0.04,
    marginBottom: Metrics.screenHeight * 0.04
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
    width: Metrics.screenWidth * 0.65,
    height: Metrics.screenHeight * 0.08,
    backgroundColor: 'rgb(160, 30, 64)',
    marginTop: Metrics.screenHeight * 0.02,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(243, 180, 70)'
  },
  slideBodyButton1: {
    alignSelf: 'center',
    width: Metrics.screenWidth * 0.65,
    height: Metrics.screenHeight * 0.08,
    backgroundColor: 'rgb(160, 30, 64)',
    marginTop: Metrics.screenHeight * 0.045,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(243, 180, 70)'
  },
  slideBodyButtonUN: {
    alignSelf: 'center',
    width: Metrics.screenWidth * 0.65,
    height: Metrics.screenHeight * 0.08,
    backgroundColor: 'rgb(160, 30, 64)',
    marginTop: Metrics.screenHeight * 0.05,
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
    top: -Metrics.screenHeight * 0.19,
    width: Metrics.screenWidth * 0.63,
    backgroundColor: 'transparent'
  },
  slideFootnoteText: {
    fontSize: 14,
    color: 'rgb(69, 64, 62)',
    textAlign: 'center'
  },
  requestorTextLastName: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: -70,
    left: 140,
    backgroundColor: 'transparent'
  },
  requestorTextFirstName: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: 100,
    left: 140,
    backgroundColor: 'transparent'
  },
  naIdText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: 250,
    left: 140,
    backgroundColor: 'transparent'
  },
  recordIdText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 16,
    top: -65,
    left: 100,
    backgroundColor: 'transparent',
    width: 400
  },
  RGNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: -150,
    left: 60,
    backgroundColor: 'transparent'
  },
  entryNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: -20,
    left: 54,
    backgroundColor: 'transparent'
  },
  NAIDText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: 95,
    left: 58,
    backgroundColor: 'transparent'
  },
  boxNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: 200,
    left: 58,
    backgroundColor: 'transparent'
  },
  stackAreaText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: -255,
    left: 21,
    backgroundColor: 'transparent'
  },
  rowNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: -175,
    left: 21,
    backgroundColor: 'transparent'
  },
  compartmentText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: -90,
    left: 22,
    backgroundColor: 'transparent'
  },
  shelfNumberText: {
    transform: [{ rotate: '90deg'}],
    fontSize: 18,
    top: -10,
    left: 23,
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
  },
  // Achivement badge
  badgeItems: {
    alignSelf: 'auto',
    justifyContent: 'center',
    marginBottom: 8
  },
  badgeItemName: {
    color: '#FFF',
    fontSize: 15,
    marginRight: 80,
    width: 120
  },
  badgesDisplay: {
    flexDirection: 'row',
    width: '100%',
    height: 62,
    marginBottom: 24,
    marginTop: 15
  },
  rankBadgeFirstOne: {
    height: 62,
    width: 63,
    marginRight: 15
  },
  rankBadge: {
    height: 62,
    width: 63,
    marginRight: 15,
    marginLeft: -10
  },
  badgePlaceholder: {
    height: 42,
    width: 42,
    borderColor: 'rgb(151, 151, 151)',
    borderWidth: 1,
    marginRight: 25,
    marginTop: 10,
    transform: [{ rotate: '45deg'}]
  }
})
