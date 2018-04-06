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
  ActivityIndicator,
  Button
} from "react-native";
import ImagePicker from "react-native-image-picker";
import Share, { ShareSheet } from "react-native-share";
import RNFetchBlob from "react-native-fetch-blob";
import firebase from "firebase";
import Toast, { DURATION } from "react-native-easy-toast";
import ResponsiveImage from "react-native-responsive-image";

const { width, height } = Dimensions.get("window");
const options = {
  title: "Select Picture",
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
    this.setState({ uploading: true });
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
            this.setState({ fbUrl: url, uploading: false }, () => {
              this.refs.image.show("Image uploaded Successfully", 2000, () => {
                console.log("done");
              });
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Toast ref="image" />
        <Button title="Select Picture" onPress={this.pickImage} />
        {this.state.fileName ? (
          <Text>Selected FIle: {this.state.fileName}</Text>
        ) : null}
        {this.state.fbUrl ? <Text>Firbase Image</Text> : null}
        <ResponsiveImage
          source={{ uri: this.state.fbUrl }}
          // style={{ width: undefined, height: undefined, flex: 1 }}
          initWidth={width * 0.9}
          initHeight={width * 0.9}
          resizeMode="contain"
        />

        {this.state.base64src
          ? [
              <Button
                title="Share Image"
                key="share"
                onPress={this.shareImage}
              />,
              <Button
                title="Upload Image"
                key="upload"
                onPress={this.uploadImage}
              />
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
