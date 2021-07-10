import { StyleSheet } from "react-native";

import { dimensions, colors } from '../../../../../shared/utils/configs'

const { HEIGHT, WIDTH } = dimensions

export default StyleSheet.create({
    container: {
        minHeight: HEIGHT * 0.06,
        maxWidth: WIDTH * 0.65,
        marginVertical: 6,
        paddingHorizontal: WIDTH * 0.03,
        paddingVertical: HEIGHT * 0.007,
        borderRadius: 10,
        flexDirection: 'column',
    },
    myContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
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
        alignSelf: 'flex-end'
    },
    myContactMessage: {
        color: '#000',
        paddingLeft: WIDTH * 0.01,
    },
    metadata: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    myContactTime: {
        marginTop: '2%',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    myTime: {
        fontSize: 14,
        color: '#E3E3E3',
        marginTop: '2%',
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: WIDTH * 0.015,
    },
    messageStatus: {
        alignSelf: 'flex-end',
        paddingBottom: HEIGHT * 0.001
    },
})