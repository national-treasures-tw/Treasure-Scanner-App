import React from 'react';
import { AppRegistry } from 'react-native';

import SharedIndex from './index.shared';

const App = () => <SharedIndex/>;

AppRegistry.registerComponent('ScanbotExample', () => App);
