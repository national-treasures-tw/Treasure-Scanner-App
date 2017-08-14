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
import SignupForm from './SignupForm';
// import LoginButtons from './LoginButtons'
import { connect } from 'react-redux'
import styles from './styles/LoginScreenStyle'
import { Images, Metrics } from '../Themes'

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
    const { fetching, showingForm, dispatch, loginError, onForgotPassword, navigation } = this.props

    return (
      <View behavior='height'>
          <SignupForm
            navigation={navigation}
            values={this.state.values}
            onChange={values => this.setState({...this.state, values})}
            fetching={fetching}
            email={email}
            name={name}
            password={password}
            passwordConfirmation={passwordConfirmation}
            onNameChange={this.onNameChange}
            handleChangeEmail={this.handleChangeEmail}
            handleChangePassword={this.handleChangePassword}
            handleChangePasswordConfirmation={this.handleChangePasswordConfirmation}
            onForgotPassword={onForgotPassword}
            onSignupButtonPressed={this.onSignupButtonPressed}
            onCancelButtonPressed={() => dispatch(LoginActions.showButtonsForm())}
            onLoginButtonPressed={() => this.props.navigation.navigate("SignIn")} />
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
          <View style={styles.container}>
            <View style={[styles.topLogo, this.state.topLogo]}>
              <Image source={Images.logo} style={styles.eosLogo} />
              <Image source={Images.name} style={styles.tntName} />
            </View>
            <View style={styles.content}>
              {
                this.renderLoginContainer()
              }
            </View>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }
}

export const mapStateToProps = (state) => ({
  fetching: false,
  loginError: false,
  isLoggedIn: false,
})

export const mapDispatchToProps = (dispatch: () => void) => ({
  dispatch,
  attemptLogin: (email: string, password: string) => {
    // dispatch(loginAsync(email, password))
  },

  attemptSignup: (fields: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    buildingId: string,
    apartmentId: string
  }) => {
    dispatch(attemptSignup(fields))
  },
  onFbLoginPressed: () => dispatch(attemptFacebookLogin()),
  // FIXME: will be implemented whene the email feature is created
  onForgotPassword: (email) => {},
  getBuildings: () => dispatch()
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
