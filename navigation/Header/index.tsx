import React from 'react';
import { View, Text } from 'react-native';
import { User } from '../../types';

import styles from './styles';
import HeaderAvatar from './HeaderAvatar';

const HeaderComponent = (props: User) => {

  const { name, imageUrl } = props;

  return (
    <View style={{ flexDirection: 'row' }}>
      <HeaderAvatar imageUrl={imageUrl} />
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.headerUser}>{name}</Text>
        <Text style={styles.time}>22 hours ago</Text>
      </View>
    </View>
  )
};

export default HeaderComponent;