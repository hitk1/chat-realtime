import React from 'react';
import { Text, TouchableOpacityProps } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

import styles from './styles'

const FlatButton: React.FC<TouchableOpacityProps & GenericTouchableProps> = ({children, ...restProps}) => {
  return (
      <RectButton
        style={styles.container}
        {...restProps}
      >
          <Text style={styles.text}>{children}</Text>
      </RectButton>
  )
}

export default FlatButton;