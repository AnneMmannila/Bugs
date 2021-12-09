import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Image, Button, Input, Overlay } from "react-native-elements";
import { MyAppText, stylesFrontPage } from "./Styles";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

export default function FrontPage() {
  const [sound, setSound] = useState();
  const [visible, setVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const navigateOverlay = () => {
    setShowVideo(showVideo ? false : true)

  }

  const playSound = async () => {
    Audio.setIsEnabledAsync(true);
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/mixkit-river-surroundings-in-the-jungle-2451.wav")
    );
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  };

  const stopSound = () => {
    setSound("");
    console.log("Unloading Sound");
    sound.unloadAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={stylesFrontPage.container}>
      <View style={stylesFrontPage.musicbtnView}>
        <Button
          title="play"
          titleStyle={stylesFrontPage.musicbtn}
          onPress={playSound}
          type="clear"
          icon={<Entypo name="music" size={32} color="black" />}
        ></Button>
        <Button
          title="stop"
          titleStyle={stylesFrontPage.musicbtn}
          onPress={stopSound}
          type="clear"
          icon={<MaterialIcons name="music-off" size={32} color="black" />}
        ></Button>
      </View>
      <View>
        <TouchableOpacity onPress={toggleOverlay}>
          <Text style={stylesFrontPage.biodivText}>Biodiversity?</Text>
        </TouchableOpacity>
      </View>
      <View style={stylesFrontPage.container1}>
        <Image
          source={require("../assets/bugsJustBug.png")}
          style={stylesFrontPage.bugsimage}
          PlaceholderContent={<Text> Bugs image</Text>}
        />
      </View>
      <View style={stylesFrontPage.container2}>
        <MyAppText props="Welcome to Bugs application!"></MyAppText>
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={ {
          alignItems: "center"
        }}
      >
        {showVideo ? 
          <View style={{ width:350, height:300, backgroundColor:'black'}}>
            <Button type='clear' icon ={<Entypo name= 'circle-with-cross' size={30} color='green'></Entypo>} buttonStyle={{ alignSelf:'flex-end'}} onPress={toggleOverlay}></Button>
            <YoutubePlayer height={200} play={true} videoId={"XTC4qiXd36Q"} />
            <Button type='clear' icon ={<Entypo name= 'chevron-thin-left' size={30} color='green'></Entypo>} buttonStyle={{ alignItems:'center'}} onPress={navigateOverlay}></Button>
          </View>  :
          <View>
            <Button type='clear' icon ={<Entypo name= 'circle-with-cross' size={30} color='green'></Entypo>} buttonStyle={{ alignSelf:'flex-end'}} onPress={toggleOverlay}></Button>
          <Text style={stylesFrontPage.overlaytext}>
          "Biodiversity refers to the variety of living species on Earth,
          including plants, animals, bacteria, and fungi. While Earth’s
          biodiversity is so rich that many species have yet to be discovered,
          many species are being threatened with extinction due to human
          activities, putting the Earth’s magnificent biodiversity at risk."
          (National Geographic, 2021).
        </Text>
        <Button type='clear' icon ={<Entypo name= 'chevron-thin-right' size={30} color='green'></Entypo>} buttonStyle={{ alignSelf:'center'}}onPress={navigateOverlay}></Button>
        </View>
          }
      </Overlay>
    </View>
  );
}
