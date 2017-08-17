// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
  },
  form: {
    // backgroundColor: Colors.clearWhite,
    borderRadius: 4,
    paddingTop: Metrics.doubleBaseMargin,
    flexDirection: 'column',
    width: Metrics.screenWidth * 0.75
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Metrics.doubleBaseMargin
  },
  rowIcon: {
    margin: Metrics.smallMargin,
    height: Metrics.icons.tiny,
    width: Metrics.icons.tiny
  },
  textInput: {
    flex: 1,
    height: Metrics.screenHeight * 0.08,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    paddingLeft: 10
  },
  textInputReadonly: {
    flex: 1,
    height: 30,
    ...Fonts.style.normal,
    color: Colors.steel
  },
  loginColumn: {
    paddingLeft: Metrics.doubleBaseMargin,
    paddingRight: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialLoginColumn: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 13
  },
  googleButton: {
    height: 42,
    width: 127,
    paddingTop: 12,
    backgroundColor: 'rgb(179, 2, 24)',
    marginRight: 18
  },
  facebookButton: {
    height: 42,
    width: 127,
    paddingTop: 12,
    backgroundColor: 'rgb(59, 89, 152)'
  },
  signupButton: {
    backgroundColor: 'transparent',
    marginRight: 32
  },
  forgotButton: {
    backgroundColor: 'transparent'
  },
  loginButton: {
    flex: 1,
    height: Metrics.screenHeight * 0.08,
    backgroundColor: 'rgb(69, 64, 62)',
    paddingLeft: Metrics.doubleBaseMargin * 2,
    paddingRight: Metrics.doubleBaseMargin * 2,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin,
    marginTop: 24
  },
  loginText: {
    ...Fonts.style.normal,
    textAlign: 'center',
    color: 'white'
  },
  loginTextSocial: {
    ...Fonts.style.normal,
    textAlign: 'center',
    color: 'white',
    fontSize: 12
  },
  cancelContainer: {
    marginBottom: Metrics.baseMargin * 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancel: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    ...Fonts.style.normal,
    color: Colors.grey
  },
  errorText: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'crimson',
    ...Fonts.style.caption
  },
  greyline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.pinkishGrey
  },
  redline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'crimson'
  },
})
