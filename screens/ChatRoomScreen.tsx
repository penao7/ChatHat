import React from 'react';
import { FlatList, ImageBackground } from 'react-native';

import { useRoute } from '@react-navigation/native';
import ChatMessage from '../components/ChatMessage';

import chatRoomData from '../data/Chats';
import background from '../assets/images/background.jpg';
import InputBox from '../components/InputBox';

const ChatRoomScreen = () => {

  const route = useRoute();

  return (
    <ImageBackground style={{ width: '100%', height: '100%' }} source={background}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={item => item.id}
        inverted
      />
      <InputBox />
    </ImageBackground>

  )
};

export default ChatRoomScreen;