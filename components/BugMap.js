import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from "react-native";
import { Image } from "react-native-elements";
import { stylesBugMap } from './Styles';


export default function BugMap() {
  const api_url = "https://annemarimannila.users.earthengine.app/view/bugs";

  return (
    <SafeAreaView style={stylesBugMap.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={stylesBugMap.container1}>
          <TouchableOpacity onPress={() => Linking.openURL(api_url)}>
            <Image
              source={require("../assets/pallo2.png")}
              style={stylesBugMap.imagestyle}
            />
          </TouchableOpacity>
          <View style={stylesBugMap.viewStyleTextYoutube}>
            <View style={stylesBugMap.textheigth}>
              <Text style={stylesBugMap.textstyle}>
                Forests are critical habitats for biodiversity. Press the Earth
                image and see how the forests have changed globally, between
                2000 and 2014. Red color on the map implicates to forest loss,
                green to current coverage and blue to forest gain.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



