// @flow

import Colors from './Colors'
import Fonts from './Fonts'
import Metrics from './Metrics'
import Images from './Images'
import ApplicationStyles from './ApplicationStyles'
import { Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const adjust = (number) => number * SCREEN_WIDTH / 375

export { Colors, Fonts, Images, Metrics, ApplicationStyles, adjust, SCREEN_WIDTH }
