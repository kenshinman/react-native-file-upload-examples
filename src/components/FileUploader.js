import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  CameraRoll,
  ScrollView,
  Modal,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Share, { ShareSheet, Button } from "react-native-share";
import RNFetchBlob from "react-native-fetch-blob";
import * as firebase from "firebase";

const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

class FileUploader extends Component {
  constructor() {
    super();

    this.state = {
      source: null,
      base64src: "",
      uploading: false,
      mime: "",
      path: "",
      fileName: "",
      fbUrl: null
    };

    const config = {
      apiKey: "AIzaSyDn6MpVFC9ZgQ0KXUoL-8hXNEBwQVWczxQ",
      authDomain: "glowing-inferno-2473.firebaseapp.com",
      databaseURL: "https://glowing-inferno-2473.firebaseio.com",
      projectId: "glowing-inferno-2473",
      storageBucket: "glowing-inferno-2473.appspot.com",
      messagingSenderId: "472136424293"
    };
    firebase.initializeApp(config);

    this.imagesRef = firebase.storage().ref("images");
    this.pickImage = this.pickImage.bind(this);
    this.shareImage = this.shareImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  shareImage() {
    console.log(this.state.base64src);
    // return false;
    const shareImageBase64 = {
      title: "React Native",
      message: "Testing app",
      url: this.state.base64src,
      subject: "Share Link" //  for email
    };
    Share.open(shareImageBase64);
  }

  pickImage() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let { uri, data, path, type, fileName } = response;
        let source = { uri: uri };

        // You can also display the image using data:
        let base64src = "data:image/jpeg;base64," + data;

        this.setState({ source, base64src, mime: type, path, fileName }, () => {
          console.log(this.state);
        });
      }
    });
  }

  uploadImage() {
    this.setState({uploading: true})
    const { path, mime, fileName } = this.state;
    let ext = mime.split("/")[1];
    const imageRef = this.imagesRef.child(fileName);
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;

    //here I read file getting file using the path and converted to base64
    fs
      .readFile(path, "base64")
      .then(data => {
        //then built the blob and returns a promise sent to the next cal callback for upload
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        // do upload here
        uploadBlob = blob;
        console.log(blob);
        imageRef
          .put(blob)
          .then(() => {
            uploadBlob.close();
            return imageRef.getDownloadURL();
          })
          .then(url => {
            console.log(url);
            this.setState({ fbUrl: url, uploading: false });
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={this.pickImage}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
        <Image source={this.state.source} style={{ width: 150, height: 210 }} />
        {this.state.fbUrl ? <Text>Firbase Image</Text> : null}
        <Image
          source={{ uri: this.state.fbUrl }}
          style={{ width: 150, height: 210 }}
        />

        {this.state.base64src
          ? [
              <Button key="share" onPress={this.shareImage}>
                Share Image
              </Button>,
              <Button key="upload" onPress={this.uploadImage}>
                Upload Image
              </Button>
            ]
          : null}

        {this.state.uploading
          ? [
              <Text key="sfdsdf">Uploading...</Text>,
              <ActivityIndicator key="sjhdfbk" />
            ]
          : null}
      </View>
    );
  }
}

export default FileUploader;
