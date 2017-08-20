import React from "react";
import { Platform, StatusBar, WebView, Button } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";

import SignIn from "./login/LoginScreen";
import SignUp from "./login/SignupScreen";
import Home from './Home/Home';
import ReceiveTask from './Task/ReceiveTask';
import CopyCenter from './Task/CopyCenter';
import DocumentReviewList from './DocumentReviewList';

const headerStyle = {
  headerStyle: { backgroundColor: 'rgb(35, 29, 11)' },
  headerTitleStyle: { color: '#FFF', fontSize: 14 },
  headerBackTitleStyle: { color: '#FFF', fontSize: 14 },
  headerTintColor: 'white'
}

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerStyle: { position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0 }
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      ...headerStyle
    }
  },
});

export const startTask = StackNavigator({
  ReceiveTask: {
    screen: ReceiveTask,
    navigationOptions: {
      ...headerStyle
    }
  },
  CopyCenter: {
    screen: CopyCenter,
    navigationOptions: {
      ...headerStyle
    }
  },
  Scan: {
    screen: DocumentReviewList,
    navigationOptions: {
      ...headerStyle
    }
  }
});

export const SignedIn = Home;

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      Task: {
        screen: startTask,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
