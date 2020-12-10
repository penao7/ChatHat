import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';

export type ChatListItemProps = {
  user: User;
};

const ContactListItem = (props: ChatListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  const onClick = async () => {

    try {

      // Create new chatroom

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

      const newChatRoom = newChatRoomData.data.createChatRoom;

      // add user to the chatroom

      await API.graphql(
        graphqlOperation(
          createChatRoomUser, {
          input: {
            userId: user.id,
            chatRoomId: newChatRoom.id
          }
        }
        )
      );

      // add authenticated user to the chatroom

      const userInfo = await Auth.currentAuthenticatedUser();

      await API.graphql(
        graphqlOperation(
          createChatRoomUser, {
          input: {
            userId: userInfo.attributes.sub,
            chatRoomId: newChatRoom.id
          }
        }
        )
      );

      navigation.navigate('ChatRoom', {
        id: newChatRoom.id,
        name: "Hardcoded name",
        imageUrl: user.imageUrl
      });

    } catch (err) {
      console.log('catched error', err);
    }
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