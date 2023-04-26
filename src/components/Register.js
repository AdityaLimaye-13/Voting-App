import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Firebase } from "../database/config";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPass, setConfPass] = useState();

  registerUser = async (email, password, confPass) => {
    if (password === confPass) {
      await Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          Firebase.firestore()
            .collection("users")
            .doc(Firebase.auth().currentUser.uid)
            .set({
              email,
              password,
            });
        });
      console.log(`logged the data`);
    } else {
      alert("passwords do not match");
    }
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={styles.titleText}>Register</Text>
      </View>
      <View style={styles.inputFields}>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter Your email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Enter Your Password"
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={styles.inputbox}
          placeholder="Confirm Your Password"
          onChangeText={(confPass) => setConfPass(confPass)}
        />
      </View>
      <TouchableOpacity
        onPress={() => registerUser(email, password, confPass)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.navigate("login")}
        style={styles.logLinkText}
      >
        Already have an account, Login!!
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inputFields: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 14,
  },
  inputbox: {
    width: 250,
    borderWidth: 4,
    borderRadius: 5,
    color: "grey",
    margin: 10,
    padding: 15,
  },
  titleText: {
    marginTop:50,
    textAlign: "center",
    fontSize: 20,
    color: "crimson",
    fontWeight: "bold",
  },
  logLinkText: {
    marginTop:20,
    textAlign: "center",
    fontSize: 20,
    color: "crimson",
    fontWeight: "bold",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 150,
    backgroundColor: "orange",
    borderRadius: 10,
    margin: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default Register;
