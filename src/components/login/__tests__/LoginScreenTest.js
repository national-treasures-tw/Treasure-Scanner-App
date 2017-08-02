import React from 'react'
// import { Provider } from 'react-redux'
import { LoginScreen, mapStateToProps } from '../LoginScreen'
// import thunk from 'redux-thunk'
import renderer from 'react-test-renderer'
// import { INITIAL_STATE as login } from '../LoginRedux'
// import configureMockStore from 'redux-mock-store'
// import eos from '../../Services/FixtureApi'
// import facebook from '../../Services/FacebookFixtureApi'

// const middlewares = [ thunk.withExtraArgument({ eos, facebook }) ]
// const mockStore = configureMockStore(middlewares)

const buildings = [
  {
    'id': 1,
    'name': 'Medieval Castle',
    'gallery': null,
    'description': 'DEssfsf',
    'websiteUrl': 'www.killwitch.com',
    'buildingImage': 'http://loremflickr.com/480/640/building',
    'createdAt': '2017-05-12T17:57:37.752Z',
    'updatedAt': '2017-05-24T21:11:22.872Z',
    'LocationId': 1,
    'Apartments': [
      {
        'id': 1,
        'floor': 93,
        'number': '9301',
        'createdAt': '2017-05-12T17:57:37.821Z',
        'updatedAt': '2017-05-12T17:57:37.821Z',
        'BuildingId': 1
      }
    ],
    'Location': {
      'id': 1,
      'streetNumber': '73',
      'streetName': 'Boatworks Drive',
      'apartment': null,
      'city': 'Bayonne',
      'state': 'NJ',
      'country': null,
      'zipcode': 7002,
      'formattedAddress': '73 Boatworks Dr, Bayonne, NJ 07002, USA',
      'lat': 40.6574459,
      'lng': -74.1350035,
      'isPrimary': null,
      'createdAt': '2017-05-10T16:49:04.347Z',
      'updatedAt': '2017-05-26T18:37:54.343Z'
    }
  }
]

const getBuildings = () => buildings

test('dummy component exists', () => {
  const dummy = renderer.create(<LoginScreen getBuildings={getBuildings} />).toJSON()
  expect(dummy).toMatchSnapshot()
})

test('map state to props sets fetching', () => {
  const login = {
    fetching: true
  }
  const startup = {
    initialized: false
  }
  const buildingList = {
    buildings
  }
  const props = mapStateToProps({ login, startup, buildingList })
  expect(login.fetching).toBe(props.fetching)
  expect(login.fetching).not.toBe(props.initialized)
})

/* test('map state to props sets showing form', () => {
  // TODO: this will be replaced with navigation or modals
  const login = {
    showingForm: 'LOGIN'
  }
  const props = mapStateToProps({ login })
  expect(login.showingForm).toBe(props.showingForm)
})

test('map state to props sets is logged in', () => {
  const login = {
    username: 'daredevil'
  }
  const props = mapStateToProps({ login })
  expect(props.isLoggedIn).toBe(true)
})

test('maps dispatch to props', () => {
  const store = (state) => ({
    dispatch: () => {}
  })

  const wrapper = renderer.create(
    <Provider store={store}>
      <Container />
    </Provider>
  )

  const container = wrapper.find(Container)

  expect(container.props.dispatch).toBe(store.dispatch)
})

test('maps dispatch to props sets attemptLogin', () => {
  const store = (state) => ({
    attemptLogin: () => {}
  })

  const wrapper = renderer.create(
    <Provider store={store}>
      <Container />
    </Provider>
  )

  const container = wrapper.find(Container)

  expect(container.props.attemptLogin).toBe(store.attemptLogin)
})

test('container is connected ', () => {
  const store = mockStore({ login })

  const wrapper = renderer.create(
    <Provider store={store}>
      <Container />
    </Provider>
  )

  const container = wrapper.find(Container)

  expect(container.name()).toBe('Connect(LoginScreen)')
}) */
