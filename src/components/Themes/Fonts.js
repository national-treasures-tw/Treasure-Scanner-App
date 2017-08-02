// @flow
import { Dimensions } from 'react-native'

const type = {
  base: 'Futura',
  bold: 'Futura-Medium'
}

const size = {
  h1: 38 * Dimensions.get('window').width / 375,
  h2: 34 * Dimensions.get('window').width / 375,
  h3: 30 * Dimensions.get('window').width / 375,
  h4: 26 * Dimensions.get('window').width / 375,
  h5: 20 * Dimensions.get('window').width / 375,
  h6: 19 * Dimensions.get('window').width / 375,
  input: 18 * Dimensions.get('window').width / 375,
  regular: 17 * Dimensions.get('window').width / 375,
  medium: 14 * Dimensions.get('window').width / 375,
  small: 12 * Dimensions.get('window').width / 375,
  tiny: 8.5 * Dimensions.get('window').width / 375
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontFamily: type.base,
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.base,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  caption: {
    fontFamily: type.base,
    fontSize: size.tiny
  },
  input: {
    fontFamily: type.base,
    fontSize: size.input
  }
}

export default {
  type,
  size,
  style
}
