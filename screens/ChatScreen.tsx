import * as React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from './../components/NewMessageButton/';

import { View } from '../components/Themed';

import chatRooms from '../data/ChatRooms';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function ChatScreen() {
  return (
    <View>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
      />
      <NewMessageButton />
    </View>
  );
};
