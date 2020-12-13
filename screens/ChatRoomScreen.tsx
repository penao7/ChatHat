import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { LogBox } from 'react-native';

// workaround for timer notification
LogBox.ignoreLogs(['Setting a timer']);

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
    ) as GetMessagesQuery
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
      next: (data: any) => {

        if (!data) {
          console.log('invalid data');
        }

        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatRoomId !== route.params.chatRoomId) {
          console.log('another room');
          return;
        }

        fetchMessages();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <KeyboardAvoidingView>
      <ImageBackground style={{ width: '100%', height: '100%' }} source={background}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} myId={myId} />}
          keyExtractor={item => item.id}
          inverted
        />
        <InputBox chatRoomId={route.params.chatRoomId} />
      </ImageBackground>
    </KeyboardAvoidingView>
  )
};

export default ChatRoomScreen;