import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { ChatRoom, User } from '../../types';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

export type ChatListItem = {
  chatRoom: ChatRoom;
};

const ChatListItem = (props: ChatListItem) => {
  const { chatRoom } = props;

  const [user, setUser] = useState({} as User);

  const users = chatRoom.chatRoomUsers.items;

  useEffect(() => {
    const getOtherUser = async () => {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const user: User = users.filter(item => item.user.id !== authenticatedUser.attributes.sub)[0].user;
      setUser(user);
    };

    getOtherUser();
  }, [])

  const navigation = useNavigation();

  const onClick = () => {
    navigation.navigate('ChatRoom', {
      imageUrl: user.imageUrl,
      name: user.name,
      chatRoomId: chatRoom.id
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => onClick()}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.lastMessage}>
              {chatRoom.lastMessage
                ? `${chatRoom.lastMessage.user.name}: ${chatRoom.lastMessage.content}`
                : ''}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>
          {moment(chatRoom.createdAt).format('D.M.Y')}
        </Text>
      </View >
    </TouchableWithoutFeedback>
  )
};

export default ChatListItem;