import React from 'react';
import { View, Text } from 'react-native';
import HeaderAvatar from './HeaderAvatar';

import styles from './styles';

type HeaderUserDetails = {
  params: {
    image: string,
    name: string
  };
};

const HeaderComponent = ({ params }: HeaderUserDetails) => {

  const { name, image } = params;

  return (
    <View style={{ flexDirection: 'row' }}>
      <HeaderAvatar imageUri={image} />
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.headerUser}>{name}</Text>
        <Text style={styles.time}>22 hours ago</Text>
      </View>
    </View>
  )
};

export default HeaderComponent;