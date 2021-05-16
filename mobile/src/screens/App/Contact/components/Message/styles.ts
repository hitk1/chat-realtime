import { StyleSheet } from "react-native";

import { dimensions, colors } from '../../../../../shared/utils/configs'

const { HEIGHT, WIDTH } = dimensions
export default StyleSheet.create({
    container: {
        // height: HEIGHT * 0.04,
        minHeight: HEIGHT * 0.04,
        width: WIDTH * 0.65,
        marginVertical: 6,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    myContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: colors.background
    },
    myContactContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#CCC'
    },
    message: {
        color: '#000',
        fontSize: 16
    },
    myMessage: {
        color: 'white',
        paddingRight: 20
    },
    myContactMessage: {
        color: '#000',
        paddingLeft: 20
    },
})