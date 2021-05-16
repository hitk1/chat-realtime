import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import AvatarIcon from '../../../../../assets/avatar.svg'

import { dimensions } from '../../../../../shared/utils/configs'
import { IProps } from './interfaces'

const { HEIGHT } = dimensions
const Contact: React.FC<IProps> = ({ contact, handleClick }) => {
    return (
        <RectButton
            onPress={handleClick}
            style={{
                height: HEIGHT * 0.11,
                backgroundColor: '#FFF',
                paddingHorizontal: 14,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <View style={{ width: 66 }}>
                <AvatarIcon />
            </View>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: 10
                }}
            >{contact.name}</Text>
        </RectButton>
    )
}

export default Contact;