import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Actions, {
  reducer,
  INITIAL_STATE,
  LoginTypes,
  isLoggedIn,
  loginAsync,
  logoutAsync,
  attemptFacebookLogin,
  attemptSignup
} from '../LoginRedux'
import {
  TenantTypes
} from '../../tenant/TenantRedux'
import eos from '../../Services/FixtureApi'
import facebook from '../../Services/FacebookFixtureApi'

const middlewares = [ thunk.withExtraArgument({ eos, facebook }) ]
const mockStore = configureMockStore(middlewares)

const {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  FACEBOOK_LOGIN_REQUEST,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILURE,

  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  LOGOUT
} = LoginTypes

require.requireActual('react-native-config')

describe('actions', () => {
  it('facebookLoginSuccess', () => {
    const state = reducer(INITIAL_STATE, Actions.facebookLoginSuccess('hi', 'my.pic.url', 'jwt0k3n', 'f4c3b00k'))

    expect(state.email).toBe('hi')
    expect(state.profilePicUrl).toBe('my.pic.url')
    expect(state.token).toBe('jwt0k3n')
    expect(state.fbToken).toBe('f4c3b00k')
  })

  it('facebookLogout', () => {
    const loginState = reducer(INITIAL_STATE, Actions.facebookLoginSuccess('hi', 'my.pic.url', 't0K3n'))
    const state = reducer(loginState, Actions.logout())

    expect(state.email).toBeFalsy()
    expect(state.fbToken).toBeFalsy()
  })

  it('can query from state that a user is logged in', () => {
    const state = reducer(INITIAL_STATE, Actions.loginSuccess('hi', 'tok3n'))
    expect(isLoggedIn(state)).toBe(true)
  })

  it('can query of the user logged in after facebook sign up', () => {
    const state = reducer(INITIAL_STATE, Actions.facebookLoginSuccess('hi', 'my.pic.url', 'jwt0k3n'))
    expect(isLoggedIn(state)).toBe(true)
  })

  it('show login buttons', () => {
    const state = reducer(INITIAL_STATE, Actions.showButtonsForm())
    expect(state.showingForm === 'BUTTONS').toBe(true)
  })

  it('show signup form', () => {
    const state = reducer(INITIAL_STATE, Actions.showSignupForm())
    expect(state.showingForm === 'SIGNUP').toBe(true)
  })

  it('show login form', () => {
    const state = reducer(INITIAL_STATE, Actions.showLoginForm())
    expect(state.showingForm === 'LOGIN').toBe(true)
  })

  it('attempt', () => {
    const state = reducer(INITIAL_STATE, Actions.loginRequest('u', 'p'))

    expect(state.fetching).toBe(true)
  })

  it('fb login action', () => {
    const state = reducer(INITIAL_STATE, Actions.facebookLoginRequest('u', 'p'))

    expect(state.fetching).toBe(true)
  })

  it('success', () => {
    const state = reducer(INITIAL_STATE, Actions.loginSuccess('hi', 'tok3n'))

    expect(state.email).toBe('hi')
    expect(state.token).toBe('tok3n')
  })

  it('failure', () => {
    const state = reducer(INITIAL_STATE, Actions.loginFailure(69))

    expect(state.fetching).toBe(false)
    expect(state.error).toBe(69)
  })

  it('signup request', () => {
    const state = reducer(INITIAL_STATE, Actions.signupRequest())

    expect(state.fetching).toBe(true)
  })

  it('signup success', () => {
    const state = reducer(INITIAL_STATE, Actions.signupSuccess('hi', 'tok3n'))

    expect(state.email).toBe('hi')
    expect(state.token).toBe('tok3n')
  })

  it('signup failure', () => {
    const state = reducer(INITIAL_STATE, Actions.signupFailure(69))

    expect(state.fetching).toBe(false)
    expect(state.error).toBe(69)
  })

  it('logout', () => {
    const loginState = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))
    const state = reducer(loginState, Actions.logout())

    expect(state.email).toBeFalsy()
  })
})

describe('async actions', () => {
  it('login successfully dispatches', () => {
    const store = mockStore({})
    const expectedActions = [
      LOGIN_REQUEST,
      LOGIN_SUCCESS
    ]

    return store
      .dispatch(loginAsync('matt', 'murdock'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type).slice(0, 2)
        expect(expectedActions).toEqual(actualActions)
      })
  })

  it('login dispatches failure if the signin failed', () => {
    const store = mockStore({})
    const expectedActions = [
      LOGIN_REQUEST,
      LOGIN_FAILURE
    ]

    return store
      .dispatch(loginAsync('', ''))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type).slice(0, 2)
        expect(expectedActions).toEqual(actualActions)
      })
  })

  it('logout successfully dispatches', () => {
    const login = { ...INITIAL_STATE, fbToken: 'token', token: 'token' }
    const tenants = {
      tenant: {
        id: 1
      }
    }
    const store = mockStore({login, tenants})
    const expectedActions = [
      TenantTypes.TENANT_SETTINGS_FAILURE, // How can this be amde into success?
      LOGOUT
    ]

    return store
      .dispatch(logoutAsync())
      .then(() => {
        const actualActions = store.getActions().map(({ error, type }) => {
          console.error(error)
          return type
        })
        expect(expectedActions).toEqual(actualActions)
      })
  })

  it('facebook successfully dispatches', () => {
    const store = mockStore(INITIAL_STATE)
    const expectedActions = [
      FACEBOOK_LOGIN_REQUEST,
      FACEBOOK_LOGIN_SUCCESS
    ]

    return store
      .dispatch(attemptFacebookLogin(1, 1))
      .then(() => {
        const actualActions = store.getActions().map(({ type }) => type).slice(0, 2)
        expect(expectedActions).toEqual(actualActions)
      })
  })

  it('facebook login dispatches failure if the signin failed', () => {
    const api = {
      facebook: async () => ({ data: { message: 'nothing to say' } })
    }
    const middlez = [ thunk.withExtraArgument({ eos: api, facebook }) ]
    const mock = configureMockStore(middlez)
    const store = mock({})
    const expectedActions = [
      FACEBOOK_LOGIN_REQUEST,
      FACEBOOK_LOGIN_FAILURE
    ]

    return store
      .dispatch(attemptFacebookLogin())
      .then(() => {
        const actualActions = store.getActions().map(action => action.type).slice(0, 2)
        expect(expectedActions).toEqual(actualActions)
      })
  })

  it('login successfully dispatches', () => {
    const store = mockStore({})
    const expectedActions = [
      LOGIN_REQUEST,
      LOGIN_SUCCESS
    ]

    return store
      .dispatch(loginAsync('matt', 'murdock'))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type).slice(0, 2)
        expect(expectedActions).toEqual(actualActions)
      })
  })

  it('signup successfully dispatches', () => {
    const store = mockStore(INITIAL_STATE)
    const expectedActions = [
      SIGNUP_REQUEST,
      SIGNUP_SUCCESS
    ]

    return store
      .dispatch(attemptSignup({
        firstName: 'matt',
        lastName: 'murdock',
        email: 'matt@murdock',
        password: 'myPassword',

        // FIXME: these need to bee passed by the user via a form
        buildingId: 1,
        apartmentId: 1
      }))
      .then(() => {
        const actualActions = store.getActions().map(({ type }) => type).slice(0, 2)
        expect(expectedActions).toEqual(actualActions)
      })
  })

  it('signup dispatches failure if the signin failed', () => {
    const store = mockStore({})
    const expectedActions = [
      SIGNUP_REQUEST,
      SIGNUP_FAILURE
    ]

    return store
      .dispatch(attemptSignup('', ''))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type)
        expect(expectedActions).toEqual(actualActions)
      })
  })
})

// FIXME: what happens when tokens expire or are invalid?
