import React, { Component } from "react";
import {View, StyleSheet, Text,TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView} from "react-native";
import db from "../config";
import firebase from "firebase"
import MyHeader from "../components/MyHeader";
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class RequesteItemScreen extends Component {
  constructor() {
    super();
    this.state = {
      userName: firebase.auth().currentUser.email,
      itemName: "",
      description: "",
    };
  }

  addItem = (itemName, description) => {
    var userName = this.state.userName;
    exchageId=this.createUniqueId()
    db.collection('exchangeRequests').add({
      "userName": userName,
      "itemName": itemName,
      "Description": description,
      "exchageId":exchageId,
      "date":firebase.firestore.FieldValue.serverTimestamp()
    });

    this.setState({
      itemName: '',
      description: '',
    })

    return alert("Item ready to exchange", "", [
      {
        text: 'OK',
        onPress: () => {
          this.props.navigation.navigate('HomeScreen');
        },
      },
    ]);
  };

  render() {
    return (
      <SafeAreaProvider>
      <View style = {{ flex: 1}}>

        <MyHeader title = "Exchange items"/>

        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView>
            <TextInput
              style={styles.formTextInput}
              placeholder={"item name"}
              onChangeText={(text) => {
                this.setState({
                  itemName: text,
                });
              }}
              value={this.state.itemName}
            />

            <TextInput
              style ={[styles.formTextInput,{height:300}]}
              multiline
              numberOfLines ={8}
              placeholder={"description"}
              onChangeText={(text) => {
                this.setState({
                  description: text,
                });
              }}
              value={this.state.description}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addItem(this.state.itemName, this.state.description);
              }}
            >
              <Text> Add Item </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formTextInput: {
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button: {
    width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
    },
});
