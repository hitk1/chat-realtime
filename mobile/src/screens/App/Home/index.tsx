import React, { useCallback, useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import ContactsFunction from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native';

import styles from './styles'

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
					console.log(contacts.map(item => item.phoneNumbers))
				}
			})
	}, [])

	useEffect(() => {
		addListener('focus', () => handlePermission())
		return () => {
			removeListener('focus', () => { })
		}
	}, [])

	return (
		<>

		</>
	)
}

export default Home;
