import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from './../components/NewMessageButton/';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { View } from '../components/Themed';
import { getUser } from './queries';
import { onCreateMessage } from '../graphql/subscriptions';

export default function ChatScreen() {

  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();

      const userData = await API.graphql(
        graphqlOperation(
          getUser, {
          id: userInfo.attributes.sub
        }
        )
      );

      setChatRooms(userData.data.getUser.chatRoomUser.items);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(
        onCreateMessage
      )
    ).subscribe({
      next: (data: any) => {

        if (!data) {
          console.log('invalid data');
        }

        fetchChatRooms();

      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
      />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
