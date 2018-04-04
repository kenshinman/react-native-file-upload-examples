import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  CameraRoll,
  ScrollView,
  Modal,
  Image,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

class FileUploader extends Component {
  state = {
    visible: false,
    photos: []
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            CameraRoll.getPhotos({
              first: 20,
              assetType: "Photos"
            })
              .then(r => {
                this.setState({ photos: r.edges, visible: true }, () => {
                  console.log(this.state);
                });
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          <Text>Open Gallery</Text>
        </TouchableOpacity>
        <Text>Hello</Text>
        <Modal
          visible={this.state.visible}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            this.setState({ visible: false });
            alert("closed");
          }}
        >
          <ScrollView>
            {this.state.photos.map((p, i) => {
              return (
                <Image
                  key={i}
                  style={{
                    width: width / 3,
                    height: width / 4
                  }}
                  source={{ uri: p.node.image.uri }}
                />
              );
            })}
            <Text>Oi</Text>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

export default FileUploader;
