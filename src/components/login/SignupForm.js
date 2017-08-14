// @flow
import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native'

// import {
//   Config,
//   CognitoIdentityCredentials
// } from 'aws-sdk/dist/aws-sdk-react-native';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute
} from 'react-native-aws-cognito-js';
import { Images } from '../Themes';
import styles from './styles/LoginFormStyle';
import { onSignIn } from "../auth";

const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_8JaJl8ZVD',
  ClientId: '428sfq1asso7a3pam8ugmmssdh',
});

// Config.region = appConfig.region;

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      password: ''
    };
  }

  onNicknameChange = (nickname) => {
    this.setState({ nickname });
  }

  onEmailChange = (email) => {
    this.setState({ email });
  }

  onPasswordChange = (password) => {
    this.setState({ password });
  }

  onSignUp = () => {
    const { email, nickname, password } = this.state;
    const { navigation } = this.props;
    console.log(`${email} with nickname ${nickname}`)
    let attributeList = [];

    const attributeEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    });
    const attributeNickname = new CognitoUserAttribute({
      Name: 'nickname',
      Value: nickname,
    });

    attributeList.push(attributeEmail);
    attributeList.push(attributeNickname);

    return userPool.signUp(email, password, attributeList, null, (err, response) => {
      if (err) {
        alert(err.message);
        return;
      }

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
          const token = result.getAccessToken().getJwtToken();
          console.log('access token + ' + token);
          onSignIn(token).then(() => navigation.navigate("SignedIn"));
        },
        onFailure: (err) => {
          alert(err);
        },
      });
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
            ref='nickname'
            style={textInputStyle}
            value={email}
            editable={editable}
            keyboardType='email-address'
            returnKeyType='next'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={this.onNicknameChange}
            underlineColorAndroid='transparent'
            onSubmitEditing={() => this.refs.password.focus()}
            placeholder={'暱稱'} />
        </View>

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
            onChangeText={handleChangePassword}
            underlineColorAndroid='transparent'
            onSubmitEditing={onLoginButtonPressed}
            placeholder={'確認密碼'} />
        </View>

        <View style={styles.loginColumn}>
          <TouchableOpacity style={styles.loginButton} onPress={this.onSignUp}>
            <Text style={styles.loginText}>{'註冊'}</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default SignupForm
