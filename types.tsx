export type RootStackParamList = {
  Root: undefined;
  ChatRoom: {
    name: string,
    imageUri: string,
    id: string
  },
  Contacts: undefined,
  NotFound: undefined;
};

export type MainTabParamList = {
  Feed: undefined;
  Chat: undefined;
  Status: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: string;
  name: string,
  imageUrl?: string
  status?: string
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  user: User;
};

export type ChatRoom = {
  id: String;
  users: User[];
  lastMessage: Message;
};
