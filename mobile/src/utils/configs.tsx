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

export { colors, dimensions }