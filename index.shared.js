/**
 * Scanbot Example
 * @flow
 */

import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { AsyncStorage, View } from 'react-native'
import { StackNavigator } from 'react-navigation';

import Scanbot from './src/Scanbot/Scanbot';

import DocumentReviewList from './src/components/DocumentReviewList';
import SessionList from './src/components/SessionList';
import configureStore from './src/store/configureStore';

// Set valid license here
Scanbot.setLicense('Px/ikVYDSTzigYnpa+pwcXluzh/sk6B+16D2zqRf2fK2HgvBDRI6ofHV+DmVSLJMgcXprW7h4bEMKkczYth3SsPeV7B0CLQJdnblxXTnC/DAAFmJxQMK+0Icl9deZWuzeZW/YDT4fCvQRLAFgaFLQKWzYzBmoZj+Sanl0R5OOdG+/thIvTQMXJF+vSvW3NGQzr1ADUKsZ8ye3O5ERLKsMtQo+kAMA/krKVPpMStHN+8lP+CU1Qb4Z7cWjSjCcqIBT3HS5e3oPDqDrp9Spy81XXYfr/KTlRIT9G7ZZIsi3650tpB1KE3zJvUzolBlKMuUVNpGHC4NjFyBUbPU6mS9Ow==\nU2NhbmJvdFNESwpUTlQuVGFpd2FuLVRyZWF1c3JlCjE1MDE4OTExOTkKNzgKMQ==\n');

import { addNavigationHelpers } from 'react-navigation';

const AppNavigator = StackNavigator({
  SessionList: { screen: SessionList },
  DocumentReviewList: { screen: DocumentReviewList },
});

const App = ({ nav, dispatch }) =>
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch: dispatch,
      state: nav
    })}
  />;

const mapStateToProps = (state, props) => ({ nav: state.nav });
// const mapDispatchToProps = dispatch => ({ dispatch: dispatch });

const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends Component {
  state = {
    rehydrated: false,
    store: configureStore(AppNavigator)
  };

  componentDidMount() {
    persistStore(this.state.store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true })
    });
  }

  render() {
    // Show the logo while we wait to get the saved state from disk
    if(!this.state.rehydrated){
      // TODO show logo here
      return <View />;
    }

    return (
      <Provider store={this.state.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;
