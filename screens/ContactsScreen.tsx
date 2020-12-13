import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ContactListItem from '../components/ContactListItem';

import { View } from '../components/Themed';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listUsers } from '../graphql/queries';
import { onCreateUser } from './../graphql/subscriptions';

export default function ContactsScreen() {

  const [users, setUsers] = useState();

  const fetchUsers = async () => {
    try {
      const usersData = await API.graphql(
        graphqlOperation(
          listUsers
        )
      );
      const userInfo = await Auth.currentAuthenticatedUser();
      const usersWithoutCurrentUser = usersData.data.listUsers.items.filter(item => item.id !== userInfo.attributes.sub)
      setUsers(usersWithoutCurrentUser);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(
        onCreateUser
      )
    ).subscribe({
      next: (data: any) => {

        if (!data) {
          console.log('invalid data');
        }
        fetchUsers();
      }
    });
    return () => subscription.unsubscribe();
  }, []);


  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={item => item.id}
        style={{ width: '100%' }}
      />
    </View>
  );
}
