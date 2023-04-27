import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const CandidateItem = (props) => {
  const [votecount, setVoteCount] = useState();
  function vote() {
    Alert.alert("Confirmation", "Do you want to vote for this candidate?", [
      {
        text: "Yes",
        onPress: () => {
          alert("Submitted your vote");
        },
      },
      { text: "No", onPress: () => noHandler() },
    ]);

    function noHandler() {
      alert("Canceled,Please vote again");
    }
  }

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
