import React, { useCallback, useEffect, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import ContactsFunction from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'
import UpdateContactsList from '../../../shared/services/UpdateContactsList';

const Home: React.FC = () => {
	const { addListener, removeListener, navigate } = useNavigation()

	const handlePermission = useCallback(() => {
		PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
			{
				'title': 'We need your help',
				'message': 'Hello! Now we need to get access to your contacts',
				'buttonPositive': "It's Okay!"
			}
		)
			.then(async permission => {
				if (permission === 'denied')
					navigate('NoContacts')
				else {
					const contacts = await ContactsFunction.getAll()
					const newContacts = await new UpdateContactsList().execute(contacts)

					if (newContacts > 0)
						Alert.alert('Novos contatos', `${newContacts} novos contatos`)
				}
			})
	}, [])

	useEffect(() => {
		addListener('focus', () => handlePermission())
		return () => removeListener('focus', () => { })
	}, [])

	return (
		<>
		</>
	)
}

export default Home;
