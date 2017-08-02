import React from 'react'
import LoginForm from '../LoginForm'
import renderer from 'react-test-renderer'

let wrapper = 0

// let s;

beforeEach(() => {
  const loginProps = {
    email: 'Daredevil',
    fetching: true,
    password: "The devil of Hell's Kitchen"
  }
  wrapper = renderer.create(<LoginForm {...loginProps} />).toJSON()
})

test('component exists', () => {
  expect(wrapper).toMatchSnapshot()
})

// test('text inputs are not editable when fetching', () => {
//   const inputs = wrapper.find('View > View > TextInput')
//   inputs.forEach(w => expect(w.props().editable).toBe(false))
// })

// test('email inputs placeholder is correct', () => {
//   const email = wrapper.find('View > View > TextInput').first()
//   expect(email.props().placeholder).toBe(I18n.t('email').toLowerCase())
// })

// test('password inputs placeholder is correct', () => {
//   const password = wrapper.find('View > View > TextInput').last()
//   expect(password.props().placeholder).toBe(I18n.t('password').toLowerCase())
// })

// test('has a login button', () => {
//   const button = wrapper.find('View > View > TouchableOpacity > Text').first()
//   expect(button.props().children).toBe(I18n.t('login').toUpperCase())
// })

// test('email not editable when fetching', () => {
//   wrapper.setProps({ fetching: true })
//   const email = wrapper.find('View > View > TextInput').first()
//   expect(email.props().editable).toBe(false)
// })

// test('password is not editable when fetching', () => {
//   wrapper.setProps({ fetching: true })
//   const password = wrapper.find('View > View > TextInput').last()
//   expect(password.props().editable).toBe(false)
// })

// test('use can forgot password', t => {
//   const button = wrapper.find('View > View > TouchableOpacity').first()
//   button.props().onPress()
//   button.simulate('press')
//   t.is(x, 1)
// })

/**
 * FIXME: test text input
 */

// test('login button can be disabled', t => {
//   // const onLoginButtonPressed = () => {console.error('clicked me');++x}

//   // wrapper.setProps({ disabled:  true, onLoginButtonPressed })
//   // const button = wrapper.find('View > View > View > TouchableOpacity').first()
//   // button.simulate('press')
//   // t.is(x, 0) // not really a good condition :(

//   // const button$ = wrapper.find('View > View > View > TouchableOpacity').first()
//   // wrapper.setProps({ disabled: false,  fetching: false, onLoginButtonPressed })
//   // button$.simulate('press')
//   // t.is(x, 1)
// })
