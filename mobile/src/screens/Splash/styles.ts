import { StyleSheet } from "react-native";

import { colors } from '../../utils/configs'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.backgroundDark
    },
    title: {
        fontSize: 21,
        color: '#FFF',
    }
})