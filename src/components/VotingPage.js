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
  ActivityIndicator,
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
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AlreadyVoted from "./AlreadyVoted";

const VotingPage = () => {

  const [candidate, setCandidate] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

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

  const fetchData = async (uid) => {
    try {
      const doc = await Firebase.firestore().collection("users").doc(uid).get();
      setHasVoted(doc.data().hasVoted);
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = Firebase.auth().currentUser;
  if (currentUser) {
    const uid = currentUser.uid;
    fetchData(uid);
  }

  console.log(hasVoted);

  useEffect(() => {
    getCandidates();
  }, [hasVoted]);

  function logout() {
    return Firebase.auth().signOut();
  }

  if (hasVoted) {
    return (
      <AlreadyVoted />
    );
  } else {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>Vote Here</Text>
        {candidate.length > 0 ? (
          <FlatList
            data={candidate}
            renderItem={({ item }) => (
              <CandidateItem
                candidateName={item.candidateName}
                voteCounter={item.count}
                id={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <ActivityIndicator
            style={{ paddingVertical: 360 }}
            color="blue"
            size={"large"}
          />
        )}
        <TouchableOpacity onPress={logout}>
          <Text style={styles.button}>
            <Feather name="arrow-left-circle" size={18} color="white" /> Logout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
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
