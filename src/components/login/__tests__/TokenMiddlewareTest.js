import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import eos from '../../Services/FixtureApi'
import facebook from '../../Services/FacebookFixtureApi'
import { checkToken } from '../TokenMiddleware'
import R from 'ramda'
import { LoginTypes } from '../LoginRedux'

const middlewares = [ thunk.withExtraArgument({ eos, facebook }) ]
const mockStore = configureMockStore(middlewares)

type Action<T> ={
  type: string,
  payload: T,
  meta: Object,
  error: ?Error
}

const { LOGOUT } = LoginTypes

let store

beforeEach(() => {
  store = mockStore({})
})

describe('middleware', () => {
  it('should pass the intercepted action to next', () => {
    let nextArgs = []
    const next = action => { nextArgs.push(action) }
    const msg = JSON.stringify({ status: 401 })
    const error = new Error(msg)
    const action = { type: 'ERROR', error }
    checkToken(store, next, action)
    const lastAction = nextArgs[0]
    expect(lastAction).toBe(action)
  })

  it('should dispatch logoutAsync if an action has error from being unauthorized', () => {
    const actions: Array<Action> = store.getActions()
    const found = R.findIndex(({ type }) => type === LOGOUT, actions)
    expect(found).toBeTruthy()
  })
})
