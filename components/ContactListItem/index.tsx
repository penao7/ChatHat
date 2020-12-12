import React, { useState } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
import { getUser } from '../../screens/queries';

export type ChatListItemProps = {
  user: User;
};

const ContactListItem = (props: ChatListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  const onClick = async () => {

    const userInfo = await Auth.currentAuthenticatedUser();

    const checkIfChatOpen = async () => {
      const currentUser = await API.graphql(
        graphqlOperation(
          getUser, {
          id: userInfo.attributes.sub
        }
        ));

      const chatRoomList = currentUser.data.getUser.chatRoomUser.items;

      const result = await chatRoomList.filter(item =>
        item.chatRoom.chatRoomUsers.items.some(item => item.user.id === user.id)
      )[0];

      if (result) {
        return result.chatRoomId
      } else {
        return ''
      }
    };

    try {

      let chatRoomId = await checkIfChatOpen();

      if (!chatRoomId) {
        console.log('creating new chatroom...');
        const newChatRoomData = await API.graphql(
          graphqlOperation(
            createChatRoom, {
            input: {}
          }
          ));

        if (!newChatRoomData.data) {
          console.log(" Failed to create a chat room");
          return;
        }

        chatRoomId = newChatRoomData.data.createChatRoom.id;

        // add user to the chatroom

        await API.graphql(
          graphqlOperation(
            createChatRoomUser, {
            input: {
              userId: user.id,
              chatRoomId: chatRoomId
            }
          }
          )
        );

        // add authenticated user to the chatroom

        await API.graphql(
          graphqlOperation(
            createChatRoomUser, {
            input: {
              userId: userInfo.attributes.sub,
              chatRoomId: chatRoomId
            }
          }
          )
        );
      } else {
        console.log('chatroom found');
      }

      navigation.navigate('ChatRoom', {
        chatRoomId: chatRoomId,
        imageUrl: user.imageUrl,
        name: user.name,
      })

    } catch (err) {
      console.log('catched error', err);
    };
  };

  return (
    <TouchableWithoutFeedback onPress={() => onClick()}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View >
    </TouchableWithoutFeedback>
  )
};

export default ContactListItem;