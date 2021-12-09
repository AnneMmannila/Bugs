import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, ActivityIndicator  } from "react-native";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithCredential,
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { MyAppText } from "./Styles.js";
import { Input, Button } from "react-native-elements";
import { logIn, store } from "./LoginRedux";
import {Ionicons } from "@expo/vector-icons";
import { stylesProfilePage } from "./Styles.js";

export default function ProfilePage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [activeuser, setActiveUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        setEmail(user.email);
        setUserName(user.displayName);
      } else {
        console.log("no user found O_o");
        store.dispatch(logIn(false));
      }
    });
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    setActiveUser(null)
    store.dispatch(logIn(false));
  };

  const reAutheticate = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = promptForCredentials();
    reauthenticateWithCredential(user, credential)
      .then(() => {
        console.log("user re-autheticated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserInformation = (e) => {
    e.preventDefault();
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: username
    })
      .then(() => {
        updateUserEmail();
        Alert.alert("Updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserEmail = () => {
    const auth = getAuth();
    updateEmail(auth.currentUser, email)
      .then(() => {
        console.log("email updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeUser = (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    reAutheticate();
    deleteUser(user)
      .then(() => {
        alert("User deleted");
        store.dispatch(logIn(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style= {stylesProfilePage.container}>
      <View style={{ padding: 10 }}>
        <MyAppText props="Profile"> </MyAppText>
      </View>
      
        {activeuser ? (
          <View style={stylesProfilePage.container}>
            <Input
              label='username'
              value={username}
              inputContainerStyle={stylesProfilePage.input}
              onChangeText={(username) => setUserName(username)}
            ></Input>
            <Input
              label='email'
              inputContainerStyle={stylesProfilePage.input}
              value={email}
              onChangeText={(email) => setEmail(email)}
            ></Input>
            <View style={stylesProfilePage.btnView}>
            <Button
              title="Update"
              onPress={(e) => updateUserInformation(e)}
              buttonStyle={stylesProfilePage.btnupdate}
            ></Button>
              <Button
                title="Remove user"
                onPress={(e) => removeUser(e)}
                buttonStyle={stylesProfilePage.btnremove}
              ></Button>
              </View>
            <View style={stylesProfilePage.buttonplacement}>
              <Button
                type="outline"
                icon={<Ionicons name='log-out-outline' size={40}></Ionicons>}
                buttonStyle={stylesProfilePage.styleForButton}
                onPress={(e) => logOut(e)}
              ></Button>
            </View>
          </View>
        ) : (
          <Text>No user found</Text>
        )}
     
    </View>
  );
}


