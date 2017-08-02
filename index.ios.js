import React from 'react';
import { AppRegistry } from 'react-native';

import SharedIndex from './index.shared';

/// fix for https://github.com/facebook/react-native/issues/9599
if(typeof global.self === "undefined") {
  console.log('[patch] global.self = global;');
  global.self = global;
}

const App = () => <SharedIndex/>;

AppRegistry.registerComponent('TaiwanNationalTreasure', () => App);
