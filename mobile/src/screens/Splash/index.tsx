import React from 'react';
import { Text, View } from 'react-native';
import { IProps } from './interfaces';

import styles from './styles'

const Splash: React.FC<IProps> = ({ text }) => {
  return (
      <View style={styles.container}>
          <Text style={styles.title}>{text}</Text>
      </View>
  )
}

export default Splash;