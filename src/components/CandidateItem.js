import { doc, increment, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import {
  Firebase,
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "../database/config";

const CandidateItem = (props) => {
  const user = Firebase.auth().currentUser;
  const [voted, setVoted] = useState(true);

  const updateVotingStatus = async () => {
    const userStatusRef = doc(db, "users", user.uid);
    setVoted(true);
    await updateDoc(userStatusRef, {
      hasVoted: voted,
    });
  };

  async function vote() {
    Alert.alert("Confirmation", "Do you want to vote for this candidate?", [
      {
        text: "Yes",
        onPress: () => {
          updateVoteCount();
          updateVotingStatus();
          alert("Voting successfull, You will be logged out now");
          setTimeout(() => {
            Firebase.auth()
              .signOut()
              .then(() => console.log("User signed out successfully"))
              .catch((error) => console.log("Error signing out:", error));
          }, 300);
        },
      },
      { text: "No", onPress: () => noHandler() },
    ]);

    function noHandler() {
      alert("Canceled, Please vote again");
    }
  }

  const updateVoteCount = async () => {
    const voteCountRef = doc(db, "candidates", props.id);

    await updateDoc(voteCountRef, {
      count: increment(1),
    });
  };

  return (
    <TouchableOpacity onPress={vote} style={styles.item}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
          textTransform: "capitalize",
        }}
      >
        {props.candidateName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 8,
    marginVertical: 10,
    backgroundColor: "skyblue",
    borderWidth: 3,
    borderRadius: 8,
    textAlign: "center",
  },
});

export default CandidateItem;
