import React, { useState, useEffect } from "react";
import { Text, View, Alert } from "react-native";
import {
  getAuth,
  onAuthStateChanged,
  deleteUser,
  reauthenticateWithCredential,
  updateProfile,
  updateEmail,
  signOut,
  EmailAuthProvider,
} from "firebase/auth";
import { MyAppText } from "./Styles.js";
import { Input, Button, Overlay } from "react-native-elements";
import { logIn, store } from "./LoginRedux";
import { Ionicons } from "@expo/vector-icons";
import { stylesProfilePage } from "./Styles.js";

export default function ProfilePage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [activeuser, setActiveUser] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          setActiveUser(user);
          setEmail(user.email);
          setUserName(user.displayName);
        } else {
          store.dispatch(logIn(false));
        }
      } catch (error) {}
    });
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    setActiveUser(null);
    store.dispatch(logIn(false));
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("sign out success");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const reAutheticate = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, password);
    reauthenticateWithCredential(user, credential)
      .then(() => {
        removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserInformation = (e) => {
    e.preventDefault();
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: username,
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

  const removeUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        alert("User deleted");
        store.dispatch(logIn(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //overlay for removing user
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={stylesProfilePage.container}>
      <View style={{ padding: 10 }}>
        <MyAppText props="Profile"> </MyAppText>
      </View>

      {activeuser ? (
        <View style={stylesProfilePage.container}>
          <Input
            label="username"
            value={username}
            inputContainerStyle={stylesProfilePage.input}
            onChangeText={(username) => setUserName(username)}
          ></Input>
          <Input
            label="email"
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
              onPress={toggleOverlay}
              buttonStyle={stylesProfilePage.btnremove}
            ></Button>
            <Overlay
              isVisible={visible}
              onBackdropPress={toggleOverlay}
              style={{
                alignItems: "center",
              }}
            >
              <Input
                label="email"
                inputContainerStyle={stylesProfilePage.input}
                value={email}
                onChangeText={(email) => setEmail(email)}
              ></Input>
              <Input
                label="password"
                inputContainerStyle={stylesProfilePage.input}
                value={password}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              ></Input>
              <View style={stylesProfilePage.btnView}>
                <Button title="Delete" onPress={reAutheticate}>
                </Button>
                <Button title="Cancel" onPress={toggleOverlay}>
                </Button>
              </View>
            </Overlay>
          </View>
          <View style={stylesProfilePage.buttonplacement}>
            <Button
              type="outline"
              icon={<Ionicons name="log-out-outline" size={40}></Ionicons>}
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
