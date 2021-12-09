import React, { useEffect, useState} from "react";
import { Text, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { MyAppText, stylesLogin } from "./Styles";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { logIn, store } from "./LoginRedux";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeViewIfAutheticated = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch(logIn(true));
      } else {
        alert("Wrong email or password or you are not signed in.");
      }
    });
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in with: ", user.email);
        changeViewIfAutheticated();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={stylesLogin.container}>
      <View style={stylesLogin.header}>
        <MyAppText props="Login"></MyAppText>
      </View>
      <View style={stylesLogin.inputview}>
        <Input
          placeholder="email address"
          inputContainerStyle={stylesLogin.input}
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType = 'email-address'
        ></Input>
        <Input
          placeholder="password"
          inputContainerStyle={stylesLogin.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry = {true}
        ></Input>
      </View>
      <View style={stylesLogin.buttonview}>
        <Button
          title="Login"
          buttonStyle={stylesLogin.buttonstyle}
          onPress={handleLogin}
        ></Button>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate("Sign Up")}
          buttonStyle={stylesLogin.buttonstyleSignUp}
        ></Button>
      </View>
    </View>
  );
}

