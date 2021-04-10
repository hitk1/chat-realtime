import React from 'react';
import { Text, View } from 'react-native';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import InputText from '../../../components/FlatInput'

import { ITextInputProps } from '../../../utils/interfaces';
import styles from './styles'

const Home: React.FC = () => {

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Hello world</Text>
		</View>
	)
}

export default Home;