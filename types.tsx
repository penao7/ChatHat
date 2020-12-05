export type RootStackParamList = {
  Root: undefined;
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
  imageUri: string
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
};

export type ChatRoom = {
  id: String;
  users: Array<User>;
  lastMessage: Message;
};
