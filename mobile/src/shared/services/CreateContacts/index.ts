import { database } from "../../infra/database";
import ContactsModel from "../../infra/database/models/Contacts";
import { SNContacts } from "../../infra/database/schema/Contacts";
import { IService } from "../../utils/interfaces";
import { IRawContacts } from "../UpdateContactsList/interfaces";

export default class CreateContacts implements IService {

    async execute(contacts: IRawContacts[]): Promise<void> {
        try {
            await database.action(async () => {
                const contactCollection = database.get<ContactsModel>(SNContacts)

                await Promise.all(contacts.map(async item => {
                    await contactCollection.create(newContact => {
                        newContact.name = item.name
                        newContact.phoneNumber = item.phones[0]
                    })
                }))
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }

}