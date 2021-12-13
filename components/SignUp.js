import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { MyAppText } from "./Styles";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { stylesSignUp } from "./Styles";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Account successfully created. You can now login.");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={stylesSignUp.container}>
      <View style={stylesSignUp.header}>
        <MyAppText props="Sign Up"></MyAppText>
      </View>
      <View style={stylesSignUp.inputview}>
        <Input
          placeholder="email address"
          inputContainerStyle={stylesSignUp.input}
          value={email}
          onChangeText={(email) => setEmail(email)}
        ></Input>
        <Input
          placeholder="password"
          inputContainerStyle={stylesSignUp.input}
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
        ></Input>
      </View>
      <View style={stylesSignUp.buttonview}>
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
          buttonStyle={stylesSignUp.buttonstyle}
        ></Button>
        <Button
          title="SignUp"
          buttonStyle={stylesSignUp.buttonstyleSignUp}
          onPress={handleSignUp}
        ></Button>
      </View>
    </View>
  );
}
