import { StyleSheet } from "react-native";
import styles from '../../shared/utils/styles'

export default StyleSheet.create({
    container: {
        backgroundColor: styles.colors.primary,
        width: '100%',
        height: 46,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    text: {
        color: '#FFF',
        // textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20
    }
})