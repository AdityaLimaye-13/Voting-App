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
import { useNavigation } from "@react-navigation/native";
import { Firebase } from "../database/config";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  checkUser = async (email, password) => {
    if (email === "admin@admin.com" && password === "admin1234") {
      await Firebase.auth().signInWithEmailAndPassword(email, password)
      navigation.navigate('admin-panel')
    } else {
      loginUser(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <Text style={styles.titleText}>Login</Text>
      </View>
      <View style={styles.inputFields}>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter Your Email"
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
        <TextInput
          style={styles.inputbox}
          placeholder="Enter Your Password"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => checkUser(email, password)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate("register")}
          style={styles.regLinkText}
        >
          Dont have an account?
        </Text>
      </View>
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
    marginTop: 50,
    textAlign: "center",
    fontSize: 20,
    color: "crimson",
    fontWeight: "bold",
  },
  regLinkText: {
    marginTop: 20,
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
    backgroundColor: "royalblue",
    borderRadius: 10,
    margin: 8,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default Login;
