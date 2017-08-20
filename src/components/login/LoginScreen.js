// @flow
import React from 'react'
import {
  AlertIOS,
  View,
  Image,
  Text,
  StatusBar,
  TouchableHighlight,
  Keyboard
} from 'react-native'
import LoginForm from './LoginForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import LoginButtons from './LoginButtons'
import { connect } from 'react-redux'
import styles from './styles/LoginScreenStyle'
import { Images, Metrics } from '../Themes';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';

export class LoginScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      values: {},
      profilePic: '',
      // name: '',
      // email: '',
      // password: '',
      // passwordConfirmation: '',
      // buildingId: 1,
      // apartmentId: 1,
      emailError: null,
      passwordError: null,
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
      keyboardShowing: false
    }
    this.isAttempting = false
  }

  // componentDidMount() {
  //   StatusBar.setHidden(true, true);
  // }

  onLoginButtonPressed = () => {
    // const { email, password } = this.state
    // const { attemptLogin } = this.props
    // this.isAttempting = true
    // attemptLogin(email, password)
  }

  onSignupButtonPressed = () => {
    // const { name, email, password } = this.state.values
    // const [firstName, lastName] = name.split(' ')
    // const { attemptSignup } = this.props
    // this.isAttempting = true
    // const buildingId = this.selectedBuildingId()
    // const apartmentId = this.selectedApartmentId()
    // attemptSignup({ firstName, lastName, email, password, buildingId, apartmentId })
  }


  onNameChange = (name: string) => {
    this.setState({ name })

    // this.handleChangeFirstName(firstName)
    // this.handleChangeLastName(lastName)
  }

  // handleChangeFirstName = (firstName: string) => {
  //   this.setState({ firstName })
  // }

  // handleChangeLastName = (lastName: string) => {
  //   this.setState({ lastName })
  // }

  handleChangeEmail = (email: string) => {
    const re = /^\S+@\S+$/
    let emailError = null
    if (!re.test(email)) {
      emailError = new Error('You entered an invalid email')
    }
    this.setState({ email, emailError })
  }

  handleChangePassword = (password: string) => {
    let passwordError = null
    if (password.length < 8) {
      passwordError = new Error('Your password is too short')
    }
    this.setState({ password, passwordError })
  }

  // handlePasswordInput

  handleChangePasswordConfirmation = (passwordConfirmation: string) => {
    let confirmationError = null
    if (passwordConfirmation === this.state.password) {
      confirmationError = new Error("Your passwords don't match")
    }
    this.setState({ passwordConfirmation, confirmationError })
  }

  onFbLoginPressed = () => {
    // this.isAttempting = true
    // // this.props.onFbLoginPressed()
    // NavigationActions.buildingSelect({ type: 'replace' })
  }

  disableSigninButton = () => {
    const { email, emailError, passwordError } = this.state
    return (passwordError !== null) && (emailError !== null) && email.length > 0
  }

  onForgotPassword = () => {
    const { onForgotPassword } = this.props
    AlertIOS.prompt(
      'Enter your email',
      null,
      onForgotPassword
    )
  }

  renderLoginContainer = () => {
    const { name, email, password, passwordConfirmation, passwordError, emailError } = this.state
    const { fetching, showingForm, dispatch, loginError, onForgotPassword, navigation, signIn } = this.props

    return (
      <View behavior='height'>
          <LoginForm
            signIn={signIn}
            navigation={navigation}
            fetching={fetching}
            email={email}
            emailError={emailError}
            passwordError={passwordError}
            submitError={loginError}
            password={password}
            disabled={this.disableSigninButton()}
            handleChangeEmail={this.handleChangeEmail}
            handleChangePassword={this.handleChangePassword}
            onLoginButtonPressed={this.onLoginButtonPressed}
            onForgotPassword={this.onForgotPassword}
            onCancelButtonPressed={() => dispatch(LoginActions.showButtonsForm())}
            onSignupButtonPressed={() => this.props.navigation.navigate("SignUp")} />
      </View>
    )
  }

  render () {
    const { isLoggedIn } = this.props
    return (
      <TouchableHighlight
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}
      >
        <Image
          resizeMode='cover'
          source={Images.loginBackground}
          style={styles.backgroundImage} >
          <KeyboardAwareScrollView
            style={{ backgroundColor: 'transparent' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.loginContainer}
            extraScrollHeight={80}
            scrollEnabled
          >
            <View style={[styles.topLogo, this.state.topLogo]}>
              <Image source={Images.logo} style={styles.tntLogo} />
              <Image source={Images.name} style={styles.tntName} />
            </View>
            <View style={styles.content}>
              {
                this.renderLoginContainer()
              }
            </View>
          </KeyboardAwareScrollView>
        </Image>
      </TouchableHighlight>
    )
  }
}

export const mapStateToProps = (state) => ({
  fetching: false,
  showingForm: 'LOGIN',
  loginError: false,
  isLoggedIn: false,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
