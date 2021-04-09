import { StyleSheet } from "react-native";
import { dimensions } from '../../../utils/configs'

const { HEIGHT, WIDTH } = dimensions
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        marginBottom: HEIGHT * 0.03,
    },
    topContainer: {
        alignItems: 'center',
        marginTop: HEIGHT * 0.18
    },
    form: {
        width: WIDTH,
        height: HEIGHT * 0.24,
        marginTop: HEIGHT * 0.06,
        paddingHorizontal: WIDTH * 0.05,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bottomBlueEffect: {
        width: '100%',
    }
})