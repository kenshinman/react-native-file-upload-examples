import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import Home from './Home'
import FileUploader from './FileUploader'
import CloudinaryUpload from './CloudinaryUpload'
import Icon from "react-native-vector-icons/Ionicons";

export const RootNavigator = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: "React Native Upload",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={35} color={tintColor} />
        )
      }
    },
    FileUploader: {
      screen: FileUploader,
      navigationOptions: {
        headerTitle: "Firebase Upload",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={35} color={tintColor} />
        )
      }
    },
    CloudinaryUpload: {
      screen: CloudinaryUpload,
      navigationOptions: {
        headerTitle: "Cloudinary Upload",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" size={35} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: "Home"
  }
);
