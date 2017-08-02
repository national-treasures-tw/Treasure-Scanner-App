// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    alignItems: 'center',
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  loginButton: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin * 2,
    borderRadius: 3,
    backgroundColor: Colors.eosWhite,
    padding: 6
  },
  fbLoginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colors.facebookBlue
  },
  fbText: {
    flex: 2,
    ...Fonts.style.caption,
    color: Colors.eosWhite,
    textAlign: 'center',
    padding: Metrics.baseMargin
  },
  facebookF: {
    flex: 0.3,
    width: Metrics.icons.tiny,
    height: Metrics.icons.small
  },
  loginText: {
    ...Fonts.style.caption,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.dustyOrange
  },
  registerText: {
    ...Fonts.style.caption,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.dustyOrange
  },
  orText: {
    ...Fonts.style.caption,
    textAlign: 'center',
    color: Colors.dustyOrange
  }
})
