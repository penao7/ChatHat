import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage';

// @ts-ignore
import background from '../assets/images/background.jpg'

import InputBox from '../components/InputBox';
import { RootStackParamList, Message } from '../types';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from './../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

export type GetMessagesQuery = {
  data: {
    messagesByChatRoom: {
      items: Message[]
    }
  }
};

const ChatRoomScreen = () => {

  const route = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [myId, setMyId] = useState('');

  const fetchMessages = async () => {
    const messageData = await API.graphql(
      graphqlOperation(
        messagesByChatRoom, {
        chatRoomId: route.params.chatRoomId,
        sortDirection: "DESC"
      }
      )
    ) as GetMessagesQuery;
    setMessages(messageData.data.messagesByChatRoom.items);
  };

  useEffect(() => {
    messages.map(item => console.log(item.content));
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();

      setMyId(userInfo.attributes.sub);
    };
    fetchUser()
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(
        onCreateMessage
      )
    ).subscribe({
      next: (data) => {

        if(!data) {
          console.log('invalid data');
        }

        console.log('data', data.value.data);

        const newMessage = data.value.data.onCreateMessage;

        console.log('newMessage', newMessage);

        if (newMessage.chatRoomId !== route.params.chatRoomId) {
          console.log('another room');
          return;
        }

        fetchMessages();

        setMessages([newMessage, ...messages]);

  
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={background}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} myId={myId} />}
        keyExtractor={item => item.id}
        inverted
      />
      <InputBox chatRoomId={route.params.chatRoomId} />
    </ImageBackground>

  )
};

export default ChatRoomScreen;