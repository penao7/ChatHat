import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { createMessage, updateChatRoom } from '../../graphql/mutations';

import styles from './styles';

type InputBoxProps = {
  chatRoomId: String
}

const InputBox = (props: InputBoxProps) => {

  const { chatRoomId } = props;

  const [message, setMessage] = useState<string>('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      setUserId(userInfo.attributes.sub);
    };
    fetchUser();
  }, []);

  const onMicrophonePress = () => {
    console.warn('microphone')
  };

  const updateChatRoomLastMessage = async (messageId: string) => {
    try {
      await API.graphql(
        graphqlOperation(
          updateChatRoom, {
          input: {
            id: chatRoomId,
            lastMessageId: messageId
          }
        })
      );
    } catch (err) {
      console.log(err);
    }

  };

  const onSendPress = async () => {

    try {

      const newMessage = await API.graphql(
        graphqlOperation(
          createMessage, {
          input: {
            content: message,
            userId: userId,
            chatRoomId: chatRoomId
          }
        }
        )
      );

      console.log('inputbox', newMessage);

      await updateChatRoomLastMessage(newMessage.data.createMessage.id);

      setMessage('');


    } catch (err) {
      console.log(err);
    }

  };

  const onPress = () => {
    if (!message) {
      onMicrophonePress()
    } else {
      onSendPress()
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5
          name="laugh-beam"
          size={24}
          color="grey"
          style={styles.icon}
        />
        <TextInput
          placeholder='Type a message'
          style={styles.textInput}
          multiline={true}
          value={message}
          onChangeText={(e) => setMessage(e)}
        />
      </View>
      <TouchableOpacity onPress={() => onPress()}>
        <View style={styles.buttonContainer}>
          {!message
            ? <MaterialCommunityIcons
              name="microphone"
              size={34} color='black'
            />
            : <MaterialIcons
              name="send"
              size={28} color='black'
            />
          }
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default InputBox;