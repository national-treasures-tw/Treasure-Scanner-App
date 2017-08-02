// @flow
import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'
import { Images } from '../Themes/'
import styles from './styles/LoginButtonsStyle'

const LoginButtons = (props) => (
  <View style={styles.container}>
    {
      <View style={styles.row}>
        <TouchableOpacity style={styles.fbLoginButton} onPress={props.onFBLoginPressed}>
          <Image source={Images.facebookLogo} style={styles.facebookF} resizeMode='contain' />
          <Text style={styles.fbText}>LOGIN WITH Facebook</Text>
        </TouchableOpacity>
      </View>
    }

    <View style={styles.row}>
      <TouchableOpacity style={styles.loginButton} onPress={props.onLoginButtonPressed}>
        <Text>
          <Text style={styles.loginText}>{'Login'.toUpperCase()} `}</Text>
          <Text style={styles.orText}>{'or'.toUpperCase()} `}</Text>
          <Text style={styles.registerText}>{'Register'.toUpperCase()}</Text>
        </Text>
      </TouchableOpacity>
    </View>

  </View>
)

export default LoginButtons
