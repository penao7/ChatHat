import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import styles from './styles';

const InputBox = () => {

  const [message, setMessage] = useState<string>('');

  const onMicrophonePress = () => {
    console.warn('microphone')
  };

  const onSendPress = () => {
    console.warn(`Sending: ${message}`);
    setMessage('');
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