import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Button, ListItem, Image } from "react-native-elements";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { stylesFavorites, MyAppText } from "./Styles";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [database, setDatabase] = useState(getDatabase());
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        let modifiedEmail = user.email.replace('@', '');
        let emailFixed = modifiedEmail.replace('.','');
        emailFixed= emailFixed.replace('-','');
        emailFixed= emailFixed.replace('.','');
        setUser(emailFixed);
      } else {
        console.log("no user found O_o");
      }
    });
  }, []);



  const showFavorites = () => {
    const itemsRef = ref(database, `favorites/${user}/`);
    onValue(itemsRef, (snapshot) => {
      const snap = snapshot.val();

      if (snap != undefined) {
        let i = 0;
        let array = [];
        for (const [key, value] of Object.entries(snap)) {
          value["identificationToDatabase"] = key;
          array.push(value);
          i = i + 1;
        }
        setFavorites(favorites.concat(array));
      }else{
        setFavorites([]); }
    });
  };

  const deleteFavorite = ({ item, e }) => {
    e.preventDefault();
    const db = getDatabase();
    if (user !== null) {
      const idetifyOwnObjects = user;
      remove(
        ref(
          db,
          `favorites/${idetifyOwnObjects}/${item.identificationToDatabase}`
        ),
        {
          item,
        }
      );
    }
    setRefresh(false);
    console.log("deleted");
    
  };

  renderFavorites = ({ item }) => (
    <ListItem bottomDivider style={stylesFavorites.listitem}>
      <ListItem.Content containerStyle={{ flexDirection: "row" }}>
        <Text style={stylesFavorites.renderHeader}>
          {item.item.scientificName}
        </Text>
        <Text>Kingdom: {item.item.kingdom} </Text>
        <Text>Phylum: {item.item.phylum} </Text>
        <Text>Class: {item.item.class}</Text>
        <Text>Order: {item.item.order}</Text>
        <Text>Family: {item.item.family}</Text>
        <Text>Parent: {item.item.parent}</Text>
        <Text style={{fontSize:6, fontStyle:'italic'}}>(c) {item.item.citation}</Text>
      </ListItem.Content>
      {item.item.image === "no image available" ? (
        <Image
          source={require("../assets/bugs.png")}
          style={stylesFavorites.images}
          PlaceholderContent={<Text> Bugs image</Text>}
        />
      ) : (
        <Image
          source={{ uri: item.item.image }}
          style={stylesFavorites.images}
          PlaceholderContent={
            <ActivityIndicator size="large" color="#00ff00" />
          }
        ></Image>
      )}
      <Button
        title="Delete"
        onPress={(e) => deleteFavorite({ item, e })}
        buttonStyle={stylesFavorites.btn}
      ></Button>
    </ListItem>
  );

  return (
    <View>
      {favorites.length === 0 ? (
        <View style={stylesFavorites.buttonview}>
          <MyAppText props='FAVORITES'/>
          <Button
            onPress={showFavorites}
            type='clear'
            icon={<Entypo name="heart" size={150} color="#3CB371" />}
          ></Button>
        </View>
      ) : (
        <View style={stylesFavorites.flatlistStyle}>
          <FlatList
            data={favorites}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderFavorites}
          ></FlatList>
        </View>
      )}
    </View>
  );
}


