import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
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
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const AdminPanel = () => {
  const [candidate, setCandidate] = useState();
  const [candidateList, setCandidateList] = useState([]);

  const addCandidate = async () => {
    try {
      const docRef = await addDoc(collection(db, "candidates"), {
        candidateName: candidate,
        count: 0,
      });
      setCandidate("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      alert("Name cannot be empty");
    }
  };

  const getCandidates = async () => {
    const querySnapshot = await getDocs(collection(db, "candidates"));
    const candidatesListItems = [];
    querySnapshot.forEach((doc) => {
      candidatesListItems.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setCandidateList(candidatesListItems);
  };

  useEffect(() => {
    getCandidates();
  }, [candidateList]);

  async function logout() {
    try {
      await Firebase.auth().signOut(); 
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.logoutBtn}>
          <Feather name="arrow-left-circle" size={18} color="white" /> Logout
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.titleText}>Admin Panel</Text>
      </View>
      <Text style={styles.inputLabel}>Add Candidate Name</Text>
      <TextInput
        style={styles.inputBox}
        value={candidate}
        onChangeText={(candidate) => setCandidate(candidate)}
      ></TextInput>
      <TouchableOpacity onPress={addCandidate}>
        <Text style={styles.button}>Add Candidate</Text>
      </TouchableOpacity>
      {candidateList.length > 0 ? (
        <FlatList
          data={candidateList}
          renderItem={({ item }) => {
            return (
              <View style={styles.adminList}>
                <Text style={styles.listText}>{item.candidateName}</Text>
                <Text style={styles.listText}>{item.count}</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator
          style={{ paddingVertical: 360 }}
          color="blue"
          size={"large"}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 30,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logoutBtn: {
    position: "relative",
    width: 90,
    top: 10,
    fontSize: 18,
    backgroundColor: "crimson",
    color: "white",
    fontWeight: "bold",
    padding: 5,
    borderRadius: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 30,
    marginTop: 50,
  },
  inputLabel: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: "bold",
  },
  inputBox: {
    marginTop: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "lightgray",
  },
  button: {
    width: 150,
    marginTop: 30,
    marginBottom: 30,
    textAlign: "center",
    alignSelf: "center",
    padding: 15,
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "steelblue",
    color: "white",
  },
  adminList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginVertical: 10,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "lightgray",
  },
  listText: {
    fontSize: 20,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
});

export default AdminPanel;
