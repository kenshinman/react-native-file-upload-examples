import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Button,
  Dimensions
} from "react-native";
import CryptoJS from "crypto-js";
import Toast, { DURATION } from "react-native-easy-toast";
import ResponsiveImage from "react-native-responsive-image";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";

import secret from '../secret'

const { width, height } = Dimensions.get("window");
const options = {
  title: "Select Avatar",
  customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

let timestamp = ((Date.now() / 1000) | 0).toString();
let api_key = secret.cloudinary.api_key
let api_secret = secret.cloudinary.api_secret
let cloud = "kaydence-co";
let hash_string = "timestamp=" + timestamp + api_secret;
let signature = CryptoJS.SHA1(hash_string).toString();
let upload_url =
  "https://api.cloudinary.com/v1_1/kaydence-co/image/upload?upload_preset=khmrhf6s";

class ClourinaryUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: null,
      base64src: "",
      uploading: false,
      mime: "",
      path: "",
      fileName: "",
      cdUrl: null
    };

    this.pickImage = this.pickImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
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

        this.setState(
          { source, base64src, mime: type, path, fileName, uri },
          () => {
            console.log(this.state);
          }
        );
      }
    });
  }

  uploadImage() {
    this.setState({ uploading: true });
    const { path, mime, fileName, uri } = this.state;
    RNFetchBlob.fetch(
      "POST",
      upload_url,
      {
        "Content-Type": "multipart/formdata"
      },
      [{ name: "file", filename: fileName, data: RNFetchBlob.wrap(uri) }]
    ).then(r => r.json())
      .then(res => {
        console.log(res);
        this.setState({uploading: false, cdUrl: res.url})
      })
      .catch(err => {
        console.log(err);
        this.setState({uploading: false})
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* <Text>Cloudinary Upload</Text> */}
        <Button title="Choose Image" onPress={this.pickImage} />

        {this.state.source ? (
          <Text>Chosen File: {this.state.fileName}</Text>
        ) : null}
        {this.state.source ? (
          <Button
            title="Upload Image"
            style={{ marginVertical: 10 }}
            color="green"
            onPress={this.uploadImage}
          />
        ) : null}

        {this.state.uploading ? (
          [<Text key="oldn">Uploading...</Text>, <ActivityIndicator key='ai' />]
        ): null}

        <ResponsiveImage 
          source={{uri:this.state.cdUrl}}
          initWidth={width * 0.9}
          initHeight={width * 0.9}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export default ClourinaryUpload;
