import { StyleSheet } from "react-native";

import { colors, dimensions } from '../../../shared/utils/configs'

const { HEIGHT, WIDTH } = dimensions
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    header: {
        width: '100%',
        paddingHorizontal: 6,
        height: 56,
        backgroundColor: colors.backgroundDark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarBackgroundContainer: {
        height: WIDTH * 0.1,
        width: WIDTH * 0.1,
        borderRadius: 50,
        backgroundColor: 'white',
        marginLeft: 10
    },
    avatarContainer: {
        height: 32,
        marginTop: 4
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 12
    },
    listMessages: {
        width: '100%'
    },
    keyboardAvoindingView: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    formContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: WIDTH * 0.02,
        backgroundColor: 'transparent'
    },
    inputContainer: {
        height: '100%',
        flex: 0.97,
        marginTop: HEIGHT * 0.009,
    },
    sendButton: {
        height: HEIGHT * 0.06,
        width: HEIGHT * 0.06,
        borderRadius: 50,
        backgroundColor: colors.backgroundDark,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7
    }
})