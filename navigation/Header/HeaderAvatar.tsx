import React from 'react';
import { Image } from 'react-native';

import styles from './styles';

type ImageUri = {
  imageUri?: string
};

const HeaderAvatar = ({ imageUri }: ImageUri) => {
  return (
    <Image
      style={styles.headerAvatarStyle}
      source={{ uri: imageUri }}
    />
  );
};

export default HeaderAvatar;