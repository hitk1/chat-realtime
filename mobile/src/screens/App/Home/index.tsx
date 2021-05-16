import React, { useCallback, useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, Text, View } from 'react-native';
import ContactsFunction from 'react-native-contacts';
import { useNavigation } from '@react-navigation/native';
import { FlatList, RectButton } from 'react-native-gesture-handler';

import Contact from './components/Contact'

import UpdateContactsList from '../../../shared/services/UpdateContactsList';
import { database } from '../../../shared/infra/database';
import { SNContacts } from '../../../shared/infra/database/schema/Contacts';
import ContactsModel from '../../../shared/infra/database/models/Contacts';
import { IContacts } from '../../../shared/utils/interfaces';
import { useAppState } from '../../../hooks/appState';

import styles from './styles'
import { dimensions } from '../../../shared/utils/configs'

const { HEIGHT } = dimensions
const Home: React.FC = ({ }) => {
	const { firstFetch, setFirstFetch } = useAppState()
	const { addListener, removeListener, navigate } = useNavigation()

	const [contacts, setContacts] = useState<IContacts[]>([])

	const loadLocalContacts = useCallback(async () => {
		const contactsCollection = database.get<ContactsModel>(SNContacts)
		await database.action(async () => {
			const contacts = await contactsCollection.query().fetch()

			setContacts(contacts as IContacts[])
			setFirstFetch(true)
		})
	}, [])

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

					if (!firstFetch)
						loadLocalContacts()
				}
			})
	}, [])

	const handleGoToMessage = useCallback((contact: IContacts) => {
		navigate('Contact', { id: contact.id, name: contact.name, phone: contact.phoneNumber })
	}, [])

	useEffect(() => {
		addListener('focus', () => handlePermission())
		return () => removeListener('focus', () => { })
	}, [])

	return (
		<>
			{
				contacts.length > 0 &&
				(
					<View
						style={styles.container}
					>
						<FlatList
							style={{ flex: 1, width: '100%' }}
							data={contacts}
							ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
							renderItem={({ item, index }: { item: IContacts, index: number }) =>
								<Contact
									handleClick={() => handleGoToMessage(item)}
									contact={item}
								/>
							}
						/>
					</View>
				)
			}
		</>
	)
}

export default Home;
