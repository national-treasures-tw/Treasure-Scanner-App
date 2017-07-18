/**
 * Scanbot Example
 * @flow
 */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';

import DocumentScanner from './src/DocumentScanner';
import Scanbot from './src/Scanbot/Scanbot';

// Set valid license here
Scanbot.setLicense('Px/ikVYDSTzigYnpa+pwcXluzh/sk6B+16D2zqRf2fK2HgvBDRI6ofHV+DmVSLJMgcXprW7h4bEMKkczYth3SsPeV7B0CLQJdnblxXTnC/DAAFmJxQMK+0Icl9deZWuzeZW/YDT4fCvQRLAFgaFLQKWzYzBmoZj+Sanl0R5OOdG+/thIvTQMXJF+vSvW3NGQzr1ADUKsZ8ye3O5ERLKsMtQo+kAMA/krKVPpMStHN+8lP+CU1Qb4Z7cWjSjCcqIBT3HS5e3oPDqDrp9Spy81XXYfr/KTlRIT9G7ZZIsi3650tpB1KE3zJvUzolBlKMuUVNpGHC4NjFyBUbPU6mS9Ow==\nU2NhbmJvdFNESwpUTlQuVGFpd2FuLVRyZWF1c3JlCjE1MDE4OTExOTkKNzgKMQ==\n');

const ScanbotExample = StackNavigator({
  DocumentScanner: { screen: DocumentScanner },
});

AppRegistry.registerComponent('ScanbotExample', () => ScanbotExample);
