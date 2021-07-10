import React from 'react';
import { View, Text } from 'react-native';
import withObservables from '@nozbe/with-observables';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { IProps } from './interfaces';

import styles from './styles';

const EnhancedMessage: React.FC<IProps> = ({ message: data, myPhone }) => {
    return (
        <View style={[
            styles.container,
            data.from === myPhone ? { ...styles.myContainer } : { ...styles.myContactContainer }
        ]}>
            <Text style={[
                styles.message,
                data.from === myPhone ? { ...styles.myMessage } : { ...styles.myContactMessage }
            ]}>
                {data.message}
            </Text>
            <View style={styles.metadata}>
                <Text style={data.from === myPhone ? styles.myTime : styles.myContactTime}>
                    {new Date(data.created_at).toLocaleTimeString().substr(0, 5)}
                </Text>
                {
                    data.from === myPhone && data.status === 1
                        ?
                        <View
                            style={styles.messageStatus}
                        >
                            <MaterialIcons name="done" color="#FFF" size={16} />
                        </View>
                        :
                        data.from === myPhone && data.status == 2
                        &&
                        <View
                            style={styles.messageStatus}
                        >
                            <MaterialIcons name="done-all" color="#FFF" size={16} />
                        </View>
                }
            </View>
        </View>
    );
}

const enhance = withObservables(['message'], ({ message }) => ({
    message
}))

export default enhance(EnhancedMessage)