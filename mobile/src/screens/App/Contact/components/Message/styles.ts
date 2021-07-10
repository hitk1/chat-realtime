import { StyleSheet } from "react-native";

import { dimensions, colors } from '../../../../../shared/utils/configs'

const { HEIGHT, WIDTH } = dimensions
export default StyleSheet.create({
    container: {
        minHeight: HEIGHT * 0.04,
        maxWidth: WIDTH * 0.65,
        marginVertical: 6,
        paddingHorizontal: WIDTH * 0.03,
        paddingVertical: HEIGHT * 0.01,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    myContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: colors.background,
        marginRight: WIDTH * 0.02,
    },
    myContactContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#CCC',
        marginLeft: WIDTH * 0.02,
    },
    message: {
        color: '#000',
        fontSize: 17
    },
    myMessage: {
        color: 'white',
        paddingRight: WIDTH * 0.01,
    },
    myContactMessage: {
        color: '#000',
        paddingLeft: WIDTH * 0.01,
    },
})