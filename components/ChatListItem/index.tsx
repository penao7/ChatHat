import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { ChatRoom } from '../../types';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export type ChatListItem = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItem) => {
  const { chatRoom } = props;
  const user = chatRoom.users[1];

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      image: user.imageUri,
      name: user.name
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => onClick()}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
          </View>
        </View>
        <Text style={styles.time}>
          {moment(chatRoom.lastMessage.createdAt).format('D.M.Y')}
        </Text>
      </View >
    </TouchableWithoutFeedback>
  )
};

export default ChatListItem;