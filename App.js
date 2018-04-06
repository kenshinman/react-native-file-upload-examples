import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";
import firebase from 'firebase'

import { RootNavigator } from "./src/components/Routes";
import Home from "./src/components/Home";
import FileUpload from "./src/components/FileUploader";

console.disableYellowBox = true;

export default class App extends Component {
  constructor() {
    super();

    const config = {
      apiKey: "AIzaSyDn6MpVFC9ZgQ0KXUoL-8hXNEBwQVWczxQ",
      authDomain: "glowing-inferno-2473.firebaseapp.com",
      databaseURL: "https://glowing-inferno-2473.firebaseio.com",
      projectId: "glowing-inferno-2473",
      storageBucket: "glowing-inferno-2473.appspot.com",
      messagingSenderId: "472136424293"
    };
    firebase.initializeApp(config);
  }
  render() {
    return <RootNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
