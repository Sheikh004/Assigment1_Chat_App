// Recorded issue if we start recording and go back to the previous screen and then return, you wont be able to record again. It gives an error.

import React, { Component, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Audio } from "expo-av";
// import * as Sharing from 'expo-sharing';
import * as Sharing from "expo-sharing";
import {
  // Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  FlatList,
  // PermissionsAndroid,
  TouchableOpacity,
  // Dimensions,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

function VoiceChatScreen(props) {
  // const [messages, setMessages] = useState([]);
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  // const [sound, setSound] = React.useState();

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
    console.log(typeof recording);
    console.log(typeof recordings);
  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  // function getRecordingLines() {
  //   return recordings.map((recordingLine, index) => {
  //     return (
  //       <View key={index} style={styles.row}>
  //         <Text style={styles.fill}>
  //           Recording {index + 1} - {recordingLine.duration}
  //         </Text>
  //         <Button
  //           style={styles.button}
  //           onPress={() => recordingLine.sound.replayAsync()}
  //           title="Play"
  //         ></Button>
  //         <Button
  //           style={styles.button}
  //           onPress={() => Sharing.shareAsync(recordingLine.file)}
  //           title="Share"
  //         ></Button>
  //       </View>
  //     );
  //   });
  // }

  // async function playSound() {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync(
  //     require("../assets/audio/audio1.wav")
  //   );
  //   setSound(sound);

  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  // return (
  //   <GiftedChat
  //     // messages={messages}
  //     // renderMessage={SingleMessage}
  //     // showAvatarForEveryMessage={true}
  //     // onSend={(messages) => onSend(messages)}
  //     user={{
  //       _id: "uihjk",
  //       name: "uihjk",
  //       avatar: "uihjk",
  //     }}
  //     placeholder=""
  //     disableComposer={true}
  //     renderActions={() => {
  //       return (
  //         <View
  //           style={{
  //             flex: 1,
  //             alignItems: "flex-end",
  //             width: "100%",
  //           }}
  //         >
  //           <Ionicons
  //             name="mic"
  //             size={30}

  //             // { onPress={this.handleAudio} }
  //           ></Ionicons>
  //         </View>
  //       );
  //     }}
  //   />
  // );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          // inverted={true}
          horizontal={false}
          data={recordings}
          renderItem={({ item }) => (
            <View style={styles.bubble}>
              <Text>Recording {item.duration}</Text>
              <Button
                onPress={() => item.sound.replayAsync()}
                title="Play"
              ></Button>
              <Button
                style={styles.button}
                onPress={() => Sharing.shareAsync(item.file)}
                title="Share"
              ></Button>
            </View>
          )}
          // keyExtractor={item=>item.key}
        />
      </View>
      <View style={{ flex: 0.08, backgroundColor: "black" }}>
        <Button
          title={recording ? "Stop Recording" : "Start Recording"}
          onPress={recording ? stopRecording : startRecording}
        />
      </View>
      {/* {getRecordingLines()} */}
      {/* <StatusBar style="auto" /> */}
    </View>
  );

  // return (
  //   <View>
  //     <Button
  //       title={recording ? "Stop Recording" : "Start Recording"}
  //       onPress={recording ? stopRecording : startRecording}
  //     />
  // {
  //   getRecordingLines();
  // }
  //     <Button title="Play Sound" onPress={playSound} />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: "flex-end",
    // flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 2,
    alignItems: "flex-end",
  },
  bubble: {
    backgroundColor: "#E3F507",
    borderRadius: 20,
    flexDirection: "row",
    // justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default VoiceChatScreen;
