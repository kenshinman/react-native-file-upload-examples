import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from "./Home";
import FileUploader from "./FileUploader";
import CloudinaryUpload from "./CloudinaryUpload";
import Icon from "react-native-vector-icons/Ionicons";

const barOptions = {
  headerTitle: "RN Upload Examples",
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={35} color={tintColor} />
  ),
  headerStyle: {
    backgroundColor: "#16a085"
  },
  headerTitleStyle: {
    color: "#fff"
  },
  headerTintColor: '#fff',
};
export const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          ...barOptions
        };
      }
    },
    FileUploader: {
      screen: FileUploader,
      navigationOptions: ({ navigation }) => {
        return {
          ...barOptions,
          headerTitle: "Firebase Example"
        };
      }
    },
    CloudinaryUpload: {
      screen: CloudinaryUpload,
      navigationOptions: ({ navigation }) => {
        return {
          ...barOptions,
          headerTitle: "Cloudinary Example"
        };
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);
