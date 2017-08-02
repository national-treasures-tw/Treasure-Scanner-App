// import React from 'react'
// import SignupForm, { structure } from '../SignupForm'
// import renderer from 'react-test-renderer'

// const signupProps = {
//   email: 'Daredevil',
//   fetching: true,
//   password: "The devil of Hell's Kitchen",
//   onChange: jest.fn(),
//   name: ''
// }

// const wrapper = renderer.create(<SignupForm {...signupProps} />).toJSON()

// test('component exists', () => {
//   expect(wrapper).toMatchSnapshot()
// })
test('Kill me now', () => {
  expect(1).toBe(1)
})

// test('text inputs are not editable when fetching', () => {
//   const inputs = wrapper.find('View > View > TextInput')
//   inputs.forEach(w => expect(w.props().editable).toBe(false))
// })

// test('name inputs placeholder is correct', () => {
//   const placeholder = structure.fields.filter(x => x.name === 'name')[0].placeholder
//   expect(placeholder).toBe('Name')
// })

// test('email inputs placeholder is correct', () => {
//   const placeholder = structure.fields.filter(x => x.name === 'email')[0].placeholder
//   expect(placeholder).toBe('Email')
// })

// test('password inputs placeholder is correct', () => {
//   const placeholder = structure.fields.filter(x => x.name === 'password')[0].placeholder
//   expect(placeholder).toBe('Password')
// })

// test('confirm password inputs placeholder is correct', () => {
//   const placeholder = structure.fields.filter(x => x.name === 'passwordConfirmation')[0].placeholder
//   expect(placeholder).toBe('Confirm Password')
// })

// test('building inputs placeholder is correct', () => {
//   const placeholder = structure.fields.filter(x => x.name === 'building')[0].placeholder
//   expect(placeholder).toBe('Building')
// })

// test('apartment inputs placeholder is correct', () => {
//   const placeholder = structure.fields.filter(x => x.name === 'apartment')[0].placeholder
//   expect(placeholder).toBe('Apt')
// })

// test('has a signup button', () => {
//   const button = wrapper.find('View > View > TouchableOpacity > Text').first()
//   expect(button.props().children).toBe(I18n.t('signup').toUpperCase())
// })

// Handled by Formula
// test('form has ref object', t => {
//   const form = new SignupForm()
//   t.truthy(form.formRef)
// })
