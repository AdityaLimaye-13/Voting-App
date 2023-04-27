import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Firebase } from "../database/config";

const AlreadyVoted = () => {
  async function logout() {
    await Firebase.auth().signOut();
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>You have already cast your vote.</Text>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.link}>Click here to logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:20,
    },
    text:{
        fontSize:24,
        fontWeight:"bold",
        marginVertical:10,
    },
    link:{
        color:'blue',
        fontSize:20,
        fontWeight:"bold",
    }
})

export default AlreadyVoted;
