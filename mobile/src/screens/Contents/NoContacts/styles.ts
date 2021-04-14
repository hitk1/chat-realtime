import { StyleSheet } from "react-native";

import { dimensions, colors } from '../../../utils/configs'

const { HEIGHT } = dimensions
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#FFF',
    },
    errorImage: {
        width: '90%',
        height: '30%',
        marginTop: HEIGHT * 0.15
    },
    button: {
        marginTop: HEIGHT * 0.03
    },
    textButton: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: colors.background
    }
})