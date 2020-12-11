import React from 'react';
import { FlatList, ImageBackground } from 'react-native';

import { RouteProp, useRoute } from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage';

import chatRoomData from '../data/Chats';

// @ts-ignore
import background from '../assets/images/background.jpg'

import InputBox from '../components/InputBox';
import { RootStackParamList } from '../types';

const ChatRoomScreen = () => {

  const route = useRoute<RouteProp<RootStackParamList, 'ChatRoom'>>();

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={background}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={item => item.id}
        inverted
      />
      <InputBox chatRoomId={route.params.chatRoomId} />
    </ImageBackground>

  )
};

export default ChatRoomScreen;