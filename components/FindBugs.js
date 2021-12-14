import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Input, Button, ListItem, Image } from "react-native-elements";
import { MyAppText, MyAppBodyText, stylesFindBugs } from "./Styles";
import { Entypo } from "@expo/vector-icons";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

const firebaseConfig = {
  apiKey: "AIzaSyBiCAGNdVptN4YYvCwCVqcYk1f3dMnO6Po",
  authDomain: "bugs-5e77f.firebaseapp.com",
  databaseURL: "https://bugs-5e77f-default-rtdb.firebaseio.com",
  projectId: "bugs-5e77f",
  storageBucket: "bugs-5e77f.appspot.com",
  messagingSenderId: "306429774656",
  appId: "1:306429774656:web:09d1ab97c8745de47308a5",
  measurementId: "G-9JN3XFSTSH",
};

initializeApp(firebaseConfig);

export default function FindBugs() {
  const [species, setSpecies] = useState([]);
  const [searchname, setSearchName] = useState("");
  const [listOfSpecies, setListOfSpecies] = useState([]);
  const [user, setUser] = useState(null);

  const controller = new AbortController();

  const getSpecies = async () => {
    try {
      let name = searchname.replace(" ", "+");
      name = name.toLowerCase();
      let response = await fetch(
        "https://api.gbif.org/v1/species?name=" + searchname,
        { signal: controller.signal }
      );
      let responseToJson = await response.json();
      if (responseToJson.results.length > 0) {
        setSpecies(responseToJson.results);
        getImage(responseToJson.results[0].key);
      } else {
        Alert.alert("No such species or bugs found :(");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getImage = async (key) => {
    try {
      let taxonkey = key;
      let response = await fetch(
        "https://api.gbif.org/v1/species/" + taxonkey + "/media",
        { signal: controller.signal }
      );
      let responseToJson = await response.json();
      if (responseToJson.results.length === 0) {
        let listWithImages = species.map((s) => ({
          ...s,
          image: "no image available",
          citation:
            "GBIF Secretariat (2021). GBIF Backbone Taxonomy. Checklist dataset https://doi.org/10.15468/39omei accessed via GBIF.org on 2021-12-09.",
        }));
        setListOfSpecies(listWithImages.slice(0, 5));
      } else {
        let listWithImages = species.map((s) => ({
          ...s,
          image: responseToJson.results[0].identifier,
          citation:
            "GBIF Secretariat (2021). GBIF Backbone Taxonomy. Checklist dataset https://doi.org/10.15468/39omei accessed via GBIF.org on 2021-12-09.",
        }));
        setListOfSpecies(listWithImages.slice(0, 5));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUser(user);
        } else {
          console.log("");
        }
      });
    } catch (error) {}
  }, []);

  const clear = () => {
    controller.abort();
    setSpecies([]);
    setListOfSpecies([]);
    setSearchName("");
  };

  const modyfyEmailForDatabase = () => {
    let modyfiedEmail = user.email.replace("@", "");
    let emailFixed = modyfiedEmail.replace(".", "");
    emailFixed = emailFixed.replace("-", "");
    emailFixed = emailFixed.replace(".", "");

    return emailFixed;
  };

  const addToFavorites = ({ e, item }) => {
    e.preventDefault();
    const db = getDatabase();
    if (user !== null) {
      const idetifyOwnObjects = modyfyEmailForDatabase();
      push(ref(db, `favorites/${idetifyOwnObjects}`), {
        item,
      });
    }
    console.log("added");
    controller.abort();
    setSpecies([]);
    setListOfSpecies([]);
    setSearchName("");
  };

  renderList = ({ item }) => (
    <ListItem
      style={{
        width: 350,
        height: 200,
        borderColor: "#D3D3D3",
        borderWidth: 1,
        marginBottom: 10,
        borderBottomWidth: 2,
      }}
    >
      <ListItem.Content containerStyle={{ flexDirection: "row" }}>
        <View style={{ width: 150 }}>
          <Text style={{ fontWeight: "bold" }}> {item.scientificName}</Text>
          <Text>Kingdom: {item.kingdom} </Text>
          <Text>Phylum: {item.phylum} </Text>
          <Text>Class: {item.class}</Text>
          <Text>Order: {item.order}</Text>
          <Text>Family: {item.family}</Text>
          <Text>Parent: {item.parent}</Text>
          <Text style={{ fontSize: 6, fontStyle: "italic" }}>
            (c) {item.citation}
          </Text>
        </View>
      </ListItem.Content>
      <Image
        PlaceholderContent={<ActivityIndicator size="large" color="#00ff00" />}
        defaultSource={require("../assets/bugs.png")}
        source={{ uri: item.image }}
        style={{ flex: 1, aspectRatio: 0.7, resizeMode: "contain" }}
      ></Image>
      <Button
        onPress={(e) => addToFavorites({ e, item })}
        type="clear"
        icon={<Entypo name="heart" size={32} color="green" />}
      ></Button>
    </ListItem>
  );

  return (
    <View style={{ flex: 1 }}>
      {listOfSpecies.length === 0 ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            paddingTop: StatusBar.currentHeight,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              justifyContent: "flex-start",
              width: "100%",
              height: 220,
              marginTop: 0,
            }}
          >
            <Image
              source={require("../assets/bugs-5173097_1280.jpg")}
              style={{ width: "100%", height: 300, resizeMode: "contain" }}
            >
              <LinearGradient
                colors={["transparent", "#ffffff"]}
                style={{ flex: 1, width: "100%" }}
                start={{ x: 1, y: 0.3 }}
                end={{ x: 1, y: 0.65 }}
              ></LinearGradient>
            </Image>
          </View>
          <View style={{ flex: 2 }}>
            <View style={stylesFindBugs.textview}>
              <MyAppBodyText props="Find and save your favorite bugs or species. (Eg. scarabaeidae, Cetonia aurata)"></MyAppBodyText>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <Input
                placeholder="search"
                leftIcon={{ name: "search", color: "gray", size: 30 }}
                inputContainerStyle={stylesFindBugs.inputcontainer}
                value={searchname}
                onChangeText={(searchname) => setSearchName(searchname)}
              ></Input>
            </View>

            <View style={stylesFindBugs.viewbtn}>
              <Button
                title="search"
                onPress={getSpecies}
                buttonStyle={stylesFindBugs.btnGetSpecies}
              ></Button>
            </View>
          </View>

          <FlatList
            data={listOfSpecies}
            renderItem={renderList}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            paddingTop: StatusBar.currentHeight,
            marginHorizontal: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Input
                placeholder="search"
                leftIcon={{ name: "search", color: "gray", size: 30 }}
                inputContainerStyle={stylesFindBugs.inputcontainer}
                value={searchname}
                onChangeText={(searchname) => setSearchName(searchname)}
              ></Input>

              <View style={stylesFindBugs.viewbtn}>
                <Button
                  title="clear"
                  onPress={clear}
                  buttonStyle={stylesFindBugs.btnClear}
                ></Button>
              </View>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <FlatList
              data={listOfSpecies}
              renderItem={renderList}
              keyExtractor={(item, index) => index.toString()}
            ></FlatList>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
