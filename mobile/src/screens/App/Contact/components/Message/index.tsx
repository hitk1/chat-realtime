import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles'
import { IProps } from './interfaces'

const Message: React.FC<IProps> = ({ data: compoundObjectData, myPhone }) => {
    const [data] = Object.values(compoundObjectData)

    return (
        <View style={[
            styles.container,
            data.phoneNumber !== myPhone ? { ...styles.myContainer } : { ...styles.myContactContainer }
        ]}>
            <Text style={[
                styles.message,
                data.phoneNumber !== myPhone ? { ...styles.myMessage } : { ...styles.myContactMessage }
            ]}>
                {data.message}
            </Text>
        </View>
    )
}

export default Message;