import React, { useState, useEffect } from "react";
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
import {
  Firebase,
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "../database/config";
import CandidateItem from "./CandidateItem";
import { Feather } from "@expo/vector-icons";

const VotingPage = () => {
  const [candidate, setCandidate] = useState([]);

  const getCandidates = async () => {
    const querySnapshot = await getDocs(collection(db, "candidates"));
    const candidatesList = [];
    querySnapshot.forEach((doc) => {
      candidatesList.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setCandidate(candidatesList);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  function logout() {
    return Firebase.auth().signOut();
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Vote Here</Text>
      <FlatList
        data={candidate}
        renderItem={({ item }) => (
          <CandidateItem
            candidateName={item.candidateName}
            voteCnt={item.count}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity onPress={logout}>
        <Text style={styles.button}>
          <Feather name="arrow-left-circle" size={18} color="white" /> Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 80,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "#2a2c2e",
    marginBottom: 30,
  },
  button: {
    textAlign: "center",
    position: "absolute",
    bottom: 20,
    left: 120,
    width: 120,
    backgroundColor: "crimson",
    padding: 20,
    borderRadius: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 19,
  },
});

export default VotingPage;
