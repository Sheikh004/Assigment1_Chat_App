import {
  GiftedChat,
  InputToolbar,
  Send,
  Message,
  Bubble,
} from "react-native-gifted-chat";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";

function TextChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  // const customMessage = (props) => {
  //   return (
  //     <Message
  //       {...props}
  //       containerStyle={{
  //         backgroundColor: "black",
  //       }}
  //     />
  //   );
  // };

  const customGiftedChat = (props) => {
    return <GiftedChat {...props} />;
  };

  const customBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { color: "#E3F507", backgroundColor: "#E3F507" },
        }}
        textStyle={{
          right: { color: "black" },
        }}
        bottomContainerStyle={{
          right: { color: "black", backgroundColor: "black" },
        }}
      />
    );
  };

  const customSend = (props) => {
    return <Send {...props} textStyle={{ color: "black", marginBottom: 5 }} />;
  };
  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "#E3F507",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          padding: 8,
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      // renderMessage={SingleMessage}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: "uihjk",
        name: "uihjk",
        avatar: "uihjk",
      }}
      renderInputToolbar={(props) => customtInputToolbar(props)}
      renderSend={(props) => customSend(props)}
      messagesContainerStyle={{
        backgroundColor: "black",
      }}
      // renderMessage={(props) => customMessage(props)}
      renderBubble={(props) => customBubble(props)}
    />
    // <View style={styles.mainView}>
    //   <View style={styles.head}>
    //     <Text style={styles.headerText}>John Smith</Text>
    //   </View>
    //   <View style={styles.body}></View>
    //   <View
    //     style={{
    //       flex: 0.1,
    //       // borderTopColor: "blue",
    //       borderTopRightRadius: 15,
    //       borderTopLeftRadius: 15,
    //       backgroundColor: "#4980E3",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <View
    //       style={{
    //         flex: 0.7,
    //         backgroundColor: "white",
    //         width: "100%",
    //         borderRadius: 20,
    //       }}
    //     >
    //       {/* <TextInput
    //         placeholder="Please Type here"
    //         style={styles.sendPart}
    //       ></TextInput> */}

    //     </View>
    //   </View>
    // </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  head: {
    backgroundColor: "#4980E3",
    // borderWidth: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 0.8,
  },
  sendPart: {
    // flex: 0.06,

    // backgroundColor: "#4980E3",
    width: "100%",
    marginBottom: 0,
    height: 40,
    // borderWidth: 2,
    // borderRadius: 20,
    alignSelf: "center",
    borderColor: "blue",
  },
  headerText: {
    fontSize: 30,
    color: "orange",
  },
});

export default TextChatScreen;
