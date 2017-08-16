// @flow
import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'react-native-aws-cognito-js';
import { Images } from '../Themes'
import styles from './styles/LoginFormStyle';
import { onSignIn } from "../auth";

const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_8JaJl8ZVD',
  ClientId: '428sfq1asso7a3pam8ugmmssdh',
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onEmailChange = (email) => {
    this.setState({ email });
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onLogin = () => {
    const { email, password } = this.state;
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(result);
        const token = result.getIdToken().getJwtToken();
        console.log('ID token + ' + token);
        this.props.signIn(token);
        onSignIn(token).then(() => this.props.navigation.navigate("SignedIn"));
      },
      onFailure: (err) => {
        alert(err);
      },
    });
  }
  render () {
    const {
      fetching,
      email,
      password,
      disabled,
      handleChangeEmail,
      handleChangePassword,
      emailError,
      passwordError,
      // submitError,
      onLoginButtonPressed,
      onCancelButtonPressed,
      onSignupButtonPressed,
      onForgotPassword
    } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    const showEmailError = emailError && emailError.message.length > 0
    const showPasswordError = passwordError && passwordError.message.length > 0
    return (
      <View style={styles.form}>

        <View style={[styles.row, showEmailError ? styles.redline : styles.greyline]}>
          <TextInput
            ref='email'
            style={textInputStyle}
            value={email}
            editable={editable}
            keyboardType='email-address'
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.onEmailChange}
            underlineColorAndroid='transparent'
            onSubmitEditing={() => this.refs.password.focus()}
            placeholder={'信箱'} />
        </View>

        <View style={[styles.row, showPasswordError ? styles.redline : styles.greyline]}>
          <TextInput
            ref='password'
            style={textInputStyle}
            value={password}
            editable={editable}
            keyboardType='default'
            returnKeyType='go'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            onChangeText={this.onPasswordChange}
            underlineColorAndroid='transparent'
            onSubmitEditing={onLoginButtonPressed}
            placeholder={'密碼'} />
        </View>

        <View style={styles.loginColumn}>
          <TouchableOpacity style={styles.loginButton} onPress={this.onLogin}>
            <Text style={styles.loginText}>{'登入'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialLoginColumn}>
          <TouchableOpacity style={styles.googleButton} onPress={(fetching || disabled) ? () => {} : onLoginButtonPressed}>
            <Text style={styles.loginTextSocial}>{'GOOGLE'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookButton} onPress={(fetching || disabled) ? () => {} : onLoginButtonPressed}>
            <Text style={styles.loginTextSocial}>{'FACEBOOK'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupPrompt}>
          <TouchableOpacity style={styles.signupButton} onPress={this.props.onSignupButtonPressed}>
            <Text style={styles.loginTextSocial}>{'註冊'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.forgotButton} onPress={(fetching || disabled) ? () => {} : onLoginButtonPressed}>
            <Text style={styles.loginTextSocial}>{'忘記密碼'}</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default LoginForm
