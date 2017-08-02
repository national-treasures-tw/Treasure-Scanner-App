import React from 'react'
import LoginButtons from '../LoginButtons'
import renderer from 'react-test-renderer'

let wrapper
// let x = 0

beforeEach(() => {
  wrapper = renderer.create(<LoginButtons />).toJSON()
})

// afterEach(() => { x = 0 })

test('component exists', () => {
  expect(wrapper).toMatchSnapshot()
})

// test('has the login button', () => {
//   const text = wrapper.find('View > View > TouchableOpacity > Text').first()
//   expect(text.length).toBe(1)
// })

// test('login button has the correct text', () => {
//   const login = wrapper.find('View > View > TouchableOpacity > Text > Text').first().props().children
//   expect(login).toBe(`${I18n.t('login').toUpperCase()} `)

//   const _or = wrapper.find('View > View > TouchableOpacity > Text > Text').at(1).props().children
//   expect(_or).toBe(`${I18n.t('or').toUpperCase()} `)

//   const register = wrapper.find('View > View > TouchableOpacity > Text > Text').last().props().children
//   expect(register).toBe(I18n.t('register').toUpperCase())
// })

// test('facebook button works', () => {
//   const onFBLoginPressed = () => ++x
//   wrapper.setProps({ onFBLoginPressed })
//   const button = wrapper.find('View > View > TouchableOpacity').first()
//   button.simulate('press')
//   expect(x).toBe(1)
// })

// test('login button works', () => {
//   const onLoginButtonPressed = () => ++x
//   wrapper.setProps({ onLoginButtonPressed })
//   const button = wrapper.find('View > View > TouchableOpacity').last()
//   button.simulate('press')
//   expect(x).toBe(1)
// })
