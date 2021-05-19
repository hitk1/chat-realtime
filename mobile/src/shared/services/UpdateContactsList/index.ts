import { Q } from '@nozbe/watermelondb'

import api from '../api'
import { Contact } from 'react-native-contacts'
import { IContactsResponse, IRawContacts } from './interfaces'
import { IService } from '../../utils/interfaces'
import { database } from '../../infra/database'
import { SNContacts } from '../../infra/database/schema/Contacts'
import CreateContacts from '../CreateContacts'
import ContactsModel from '../../infra/database/models/Contacts'
import GenerateFriendList from '../GenerateFriendLists'

export default class UpdateContactsList implements IService {

    async execute(rawContacts: Contact[]): Promise<number> {
        try {
            const contacts = this.getFormatedContacts(rawContacts)
            const users = await this.checkContacts(contacts)
            const amountNewUsers = await this.insertIfNotExists(contacts, users)

            return amountNewUsers
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private async insertIfNotExists(contacts: IRawContacts[], users: IContactsResponse[]): Promise<number> {
        try {
            let result = 0
            const createContactService = new CreateContacts()
            const generateFriendList = new GenerateFriendList()
            const contactsCollection = database.get<ContactsModel>(SNContacts)
            const rawQuery = `SELECT * FROM ${SNContacts} WHERE phoneNumber IN (${contacts.reduce((prev: string[], curr) => [...prev, `'${curr.phones[0]}'`], [])})`

            const localContactsStored = await contactsCollection.unsafeFetchRecordsWithSQL(rawQuery)

            if (localContactsStored.length > 0) {
                const activeUsers = users.map(item => item.phoneNumber)
                const localContacts = localContactsStored.map(item => item.phoneNumber)

                const newNumbers = activeUsers
                    .filter((raw: any) => !localContacts.includes(raw))
                    .concat(localContacts.filter((existing: any) => !activeUsers.includes(existing)) as any)

                if (newNumbers.length > 0) {
                    let newContacts = <IRawContacts[]>[]

                    for (let index = 0; index < newNumbers.length; index++) {
                        const contact = contacts.find(user => user.phones[0] === newNumbers[index])
                        newContacts.push(contact as IRawContacts)
                    }

                    await createContactService.execute(newContacts)
                    await generateFriendList.execute(newContacts)
                    result = newContacts.length
                }

            } else {
                await createContactService.execute(contacts)
                await generateFriendList.execute(contacts)
            }

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private async checkContacts(contacts: IRawContacts[]): Promise<IContactsResponse[]> {
        try {

            const json = { phones: contacts.reduce((prev: string[], curr) => [...prev, curr.phones[0]], []) }

            let response = await api.post(
                '/users/findFriends',
                json
            )

            if (!response)
                response = await api.post(
                    '/users/findFriends',
                    json
                )

            if (response.status === 200) {
                const { data }: { data: IContactsResponse[] } = response.data

                return data
            }

            throw new Error('Request error with statuscode different that is expected')
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private getFormatedContacts(rawContacts: Contact[]): IRawContacts[] {
        const contacts = rawContacts.map(item => {
            const numbers = item.phoneNumbers.map(phoneItem => {
                const { number } = phoneItem

                return number.replace(/[()-\s]/g, '')
            })

            return {
                name: item.displayName,
                phones: numbers
            }
        })

        return contacts
    }

}