import React from 'react';
import { Image } from 'react-native';

import styles from './styles';

type ImageUri = {
  imageUrl?: string
};

const HeaderAvatar = ({ imageUrl }: ImageUri) => {

  return (
    <Image
      style={styles.headerAvatarStyle}
      source={{ uri: imageUrl }}
    />
  );
};

export default HeaderAvatar;