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
        backgroundColor: 'white'
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
    keyboardAvoindingView: {
        flex: 1,
        width: '100%'
    },
})