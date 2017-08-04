/**
 * Scanbot Example
 * @flow
 */

import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { AsyncStorage, View } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { addNavigationHelpers } from 'react-navigation';

import Scanbot from './src/Scanbot/Scanbot';
import DocumentReviewList from './src/components/DocumentReviewList';
import LoginScreen from './src/components/login/LoginScreen';
import Home from './src/components//Home/Home';
import configureStore from './src/store/configureStore';

import config from './src/config';

// Set valid license and translations here
Scanbot.setLicense(config.scanbotLicense);
Scanbot.setTranslations(config.labelTranslations);

const AppNavigator = StackNavigator({
  // @Hsin you can add more app screens here if you need
  LoginScreen: { screen: Home },
  Home: { screen: LoginScreen },
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
