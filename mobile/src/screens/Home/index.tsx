import React from 'react';
import { Text, View } from 'react-native';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import InputText from '../../components/InputText'

import { ITextInputProps } from '../../utils/interfaces';
import styles from './styles'

const Home: React.FC = () => {
	const formRef = React.useRef<FormHandles>(null)
	const phoneRef = React.useRef<ITextInputProps>(null)

	return (
		<View style={styles.container}>
			<Form
			style={styles.formContainer}
				ref={formRef}
				onSubmit={() => {}}
			>
				<InputText
					ref={phoneRef}
					name="UserPhoneNumber"
				/>
			</Form>
		</View>
	)
}

export default Home;