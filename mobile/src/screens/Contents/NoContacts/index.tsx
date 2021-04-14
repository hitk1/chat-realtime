import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import errorImage from '../../../assets/error_404.jpg'

import { IProps } from './interfaces'
import styles from './styles'

const NoContacts: React.FC<IProps> = ({ }) => {
    const { goBack } = useNavigation()

    return (
        <View style={styles.container}>
            <Image
                style={styles.errorImage}
                source={errorImage}
                width={10}
                height={10}
                resizeMode="stretch"
            />
            <RectButton
            style={styles.button}
                onPress={() => goBack()}
            >
                <Text
                    style={styles.textButton}
                >I will try again</Text>
            </RectButton>
        </View>
    );
}

export default NoContacts;