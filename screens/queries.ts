export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUrl
      status
      chatRoomUser {
        items {
          id
          userId
          chatRoomId
          createdAt
          updatedAt
          chatRoom {
            id
            chatRoomUsers {
              items {
                user {
                  id
                  name
                  imageUrl
                  status
                }
              }
            }
            lastMessage {
              id
              user {
                name
              }
              content
              chatRoomId
              createdAt
              updatedAt
            }
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;