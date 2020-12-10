import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ContactListItem from '../components/ContactListItem';

import { View } from '../components/Themed';

import { API, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../graphql/queries';

const url = '../assets/images/avatars/avataaars.png';

export default function ContactsScreen() {

  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        );
        setUsers(usersData.data.listUsers.items)
      } catch (err) {
        console.log(err);
      };
    };
    fetchUsers();
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

const styles = StyleSheet.create({
});
