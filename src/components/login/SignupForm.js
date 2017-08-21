// @flow
import React from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
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
      password: '',
      confirmPassword: '',
      isLoading: false
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

  onConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword });
  }

  onSignUp = () => {
    const { email, nickname, password } = this.state;
    const { navigation } = this.props;
    this.setState({ isLoading: true });
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
          const token = result.getIdToken().getJwtToken();
          this.props.signIn(token);
          this.setState({ isLoading: false });
          onSignIn(token).then(() => this.props.navigation.navigate("SignedIn"));
        },
        onFailure: (err) => {
          alert(err);
          this.setState({ isLoading: false });
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
            placeholder={'密碼'} />
        </View>

        <View style={[styles.row, showPasswordError ? styles.redline : styles.greyline]}>
          <TextInput
            ref='confirmPassword'
            style={textInputStyle}
            value={password}
            editable={editable}
            keyboardType='default'
            returnKeyType='go'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            onChangeText={this.onConfirmPasswordChange}
            underlineColorAndroid='transparent'
            onSubmitEditing={this.onSignUp}
            placeholder={'確認密碼'} />
        </View>

        <View style={styles.loginColumn}>
          <TouchableOpacity style={styles.loginButton} onPress={this.onSignUp}>
            { this.state.isLoading ? <ActivityIndicator size="small" animating /> : <Text style={styles.loginText}>{'註冊'}</Text> }
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

export default SignupForm
