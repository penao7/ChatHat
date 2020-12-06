import React from 'react';
import { View, Text } from 'react-native';
import { User } from '../../types';

import styles from './styles';
import HeaderAvatar from './HeaderAvatar';

const HeaderComponent = (props: User) => {

  const { name, imageUri } = props;

  return (
    <View style={{ flexDirection: 'row' }}>
      <HeaderAvatar imageUri={imageUri} />
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.headerUser}>{name}</Text>
        <Text style={styles.time}>22 hours ago</Text>
      </View>
    </View>
  )
};

export default HeaderComponent;