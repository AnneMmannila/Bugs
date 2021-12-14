import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { useFonts, Bungee_400Regular } from "@expo-google-fonts/bungee";

export function MyAppText({ props }) {
  let [fontsLoaded] = useFonts({
    Bungee_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Text style={styles.text}>{props}</Text>
      </View>
    );
  }
}

export function MyAppBodyText({ props }) {
  let [fontsLoaded] = useFonts({
    Bungee_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Text style={styles.bodytext}>{props}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Bungee_400Regular",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  bodytext: {
    fontFamily: "Bungee_400Regular",
    fontSize: 15,
    textAlign: "center",
    color: "gray",
  },
});

export const stylesBugMap = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 10,
  },
  container1: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 200,
  },
  mapStyle: { width: 200, height: 200 },
  scrollview: { backgroundColor: "#ffffff" },
  imagestyle: { width: 250, height: 300 },
  viewStyleTextYoutube: { flex: 1, width: 300, height: 200 },
  textheigth: { height: 200 },
  textstyle: { fontSize: 18, textAlign: "center", paddingTop: 10 },
});

export const stylesFavorites = StyleSheet.create({
  btn: { backgroundColor: "red" },
  buttonview: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 200,
  },
  buttonstyle: { backgroundColor: "black" },
  flatlistStyle: { marginHorizontal: 5 },
  renderHeader: { fontWeight: "bold" },
  listitem: { width: 370, height: 200, padding: 2 },
  images: { width: 100, height: 100, resizeMode: "contain" },
});

export const stylesFindBugs = StyleSheet.create({
  btnGetSpecies: { backgroundColor: "black", width: 100, height: 50 },
  btnClear: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    marginBottom: 10,
  },
  viewbtn: { flex: 0.5, justifyContent: "flex-start", alignItems: "center" },
  inputcontainer: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    borderBottomWidth: 2,
  },
  textview: { flex: 0.5, justifyContent: "flex-start" },
  fullview: { flex: 1, marginHorizontal: 10, backgroundColor: "#ffffff" },
});

export const stylesFrontPage = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 10,
  },
  container1: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container2: {
    flex: 1,
    justifyContent: "flex-start",
  },
  musicbtn: { color: "green", width: 37 },
  musicbtnView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  overlaytext: {
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    paddingTop: 10,
  },
  bugsimage: { flex: 1, aspectRatio: 0.5, resizeMode: "contain" },
  biodivText: { fontSize: 20, color: "green" },
});

export const stylesLogin = StyleSheet.create({
  input: {
    borderColor: "#3CB371",
    borderWidth: 2,
    borderRadius: 10,
    borderBottomWidth: 2,
  },
  container: { flex: 1 },
  inputview: { flex: 3, justifyContent: "flex-end", alignItems: "center" },
  header: { flex: 1, justifyContent: "flex-end" },
  buttonview: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  buttonstyle: { width: 150, backgroundColor: "#3CB371" },
  buttonstyleSignUp: { width: 150, backgroundColor: "#8FBC8F" },
});

export const stylesProfilePage = StyleSheet.create({
  container: { flex: 1 },
  btnremove: { backgroundColor: "red", width: 150 },
  btnupdate: { backgroundColor: "#3CB371", width: 150, alignSelf: "center" },
  btnView: { flex: 1, flexDirection: "row", justifyContent: "space-evenly" },
  input: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    borderBottomWidth: 2,
    width: 350,
  },
  styleForButton: {
    borderColor: "black",
    borderRadius: 20,
    textAlign: "center",
    width: 100,
    height: 70,
    borderWidth: 3,
  },
  buttonplacement: { alignSelf: "center", padding: 50 },
});

export const stylesSignUp = StyleSheet.create({
  input: {
    borderColor: "#3CB371",
    borderWidth: 2,
    borderRadius: 10,
    borderBottomWidth: 2,
  },
  container: { flex: 1 },
  inputview: { flex: 3, justifyContent: "flex-end", alignItems: "center" },
  header: { flex: 1, justifyContent: "flex-end" },
  buttonview: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "row-reverse",
  },
  buttonstyle: { width: 150, backgroundColor: "#8FBC8F" },
  buttonstyleSignUp: { width: 150, backgroundColor: "#3CB371" },
});
