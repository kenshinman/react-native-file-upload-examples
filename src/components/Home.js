import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";

const data = [
  { title: "Firebase Upload Example", id: 1, subtitle: "Example using firebase as our cloud storage", component: 'FileUploader' },
  { title: "Cloudinary Upload Example", id: 2, subtitle: "Clourinary upload example", component: 'CloudinaryUpload' },
];

class Home extends Component {
  constructor(){
    super();
    this.state = {

    };

    this.handleItemPress = this.handleItemPress.bind(this)
  }

  handleItemPress(){
    
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <List>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <ListItem 
                onPress={() => {
                  // alert('oi')
                  this.props.navigation.navigate(item.component)
                }} 
                title={item.title} 
                subtitle={item.subtitle} 
                />
              )
            }}
          />
        </List>
      </ScrollView>
    );
  }
}

export default Home;
