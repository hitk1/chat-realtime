import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles'
import { IProps } from './interfaces'

const Message: React.FC<IProps> = ({ data }) => {
    const myId = 'dfghdshdghdghsdghsdghsdghsd'

    return (
        <View style={[
            styles.container,
            data.id !== myId ? { ...styles.myContainer } : { ...styles.myContactContainer }
        ]}>
            <Text style={[
                styles.message,
                data.id !== myId ? { ...styles.myMessage } : { ...styles.myContactMessage }
            ]}>
                {data.message}
            </Text>
        </View>
    )
}

export default Message;