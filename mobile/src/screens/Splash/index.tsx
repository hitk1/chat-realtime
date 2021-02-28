import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles'

const Splash: React.FC = () => {
  return (
      <View style={styles.container}>
          <Text style={styles.title}>Carregando...</Text>
      </View>
  )
}

export default Splash;