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
    borderRadius: 3
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
    width: 100
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
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
