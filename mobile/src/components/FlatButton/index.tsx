import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles'

const FlatButton: React.FC = ({children, ...restProps}) => {
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