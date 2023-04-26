import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Firebase } from "../database/config";

const Stack = createStackNavigator();
const VotingPage = () => {
  const candidates = [
    {
      id: 1,
      name: "Candidate 1",
    },
    {
      id: 2,
      name: "Candidate 2",
    },
    {
      id: 3,
      name: "Candidate 3",
    },
    {
      id: 4,
      name: "Candidate 4",
    },
  ];

  function vote() {
    Alert.alert("Confirmation", "Do you want to vote for this candidate?", [
      {
        text: "Yes",
        onPress: () => {
          alert("Submitted your vote");
          Firebase.auth().signOut();
        },
      },
      { text: "No", onPress: () => noHandler() },
    ]);

    function noHandler() {
      alert("Canceled,Please vote again");
    }
  }
  function logout() {
    return Firebase.auth().signOut();
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Vote Here</Text>
      <FlatList
        data={candidates}
        renderItem={(element) => {
          return (
            <TouchableOpacity onPress={vote} style={styles.item}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                {element.item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(element) => element.id}
      />
      <TouchableOpacity onPress={logout}>
        <Text style={styles.button}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 80,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 30,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 8,
    marginVertical: 10,
    backgroundColor: "indianred",
    borderWidth: 3,
    borderRadius: 8,
    textAlign: "center",
  },
  button: {
    textAlign: "center",
    position: "absolute",
    top: 30,
    left: 120,
    width: 120,
    backgroundColor: "crimson",
    padding: 20,
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default VotingPage;
