export type RootStackParamList = {
  Root: undefined;
  ChatRoom: {
    name: string,
    imageUrl: string,
    chatRoomId: string,
  },
  Contacts: undefined,
  NotFound: undefined;
};

export type MainTabParamList = {
  Feed: undefined;
  Chat: undefined;
  Status: undefined;
};

export type User = {
  id: string;
  name: string;
  imageUrl?: string;
  status?: string;
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  user: User;
};

export type ChatRoom = {
  id: String;
  users: User[]
  lastMessage: Message
  chatRoomUsers: {
    items: []
  }
};
