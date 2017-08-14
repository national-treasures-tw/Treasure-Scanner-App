import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator, Button } from "react-navigation";

import SignIn from "./login/LoginScreen";
import SignUp from "./login/SignupScreen";
import Home from './Home/Home';
import ReceiveTask from './Task/ReceiveTask';
import CopyCenter from './Task/CopyCenter';
import DocumentReviewList from './DocumentReviewList';

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  },
});

export const startTask = StackNavigator({
  ReceiveTask: {
    screen: ReceiveTask
  },
  CopyCenter: {
    screen: CopyCenter
  },
  Scan: {
    screen: DocumentReviewList
  },
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
