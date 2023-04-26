import { StyleSheet} from "react-native";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Firebase } from "./src/database/config";
import { useEffect, useState } from "react";
import VotingPage from "./src/components/VotingPage";

const Stack = createStackNavigator();

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyDgIN-b8v4aq5tRdDvHdVibyPw0WvAO81k",
    authDomain: "voting-app-74856.firebaseapp.com",
    projectId: "voting-app-74856",
    storageBucket: "voting-app-74856.appspot.com",
    messagingSenderId: "441163329981",
    appId: "1:441163329981:web:831154ff3d0f435a5ce2d4",
    measurementId: "G-E196FKRMEM",
  };
  Firebase.initializeApp(firebaseConfig)
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = Firebase.auth().onAuthStateChanged(onAuthChanged);
    return subscriber;
  }, []);

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="voting-page" component={VotingPage} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
};
