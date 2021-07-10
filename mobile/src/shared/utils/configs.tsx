import { Dimensions } from "react-native"

const colors = {
    background: '#4B8CC9',
    backgroundDark: '#005F98',
    error: '#C53030',
}

const dimensions = {
    HEIGHT: Dimensions.get('screen').height,
    WIDTH: Dimensions.get('screen').width
}

const defaultHitSlop = {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25
}

const apiIP = '192.168.0.112'

export { colors, dimensions, apiIP, defaultHitSlop }