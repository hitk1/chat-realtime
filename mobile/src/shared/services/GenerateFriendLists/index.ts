import { IService } from "../../utils/interfaces";
import api from "../api";
import { IRawContacts } from "../UpdateContactsList/interfaces";
import { IGenerateFriendListResponse } from "./interfaces";

export default class GenerateFriendList implements IService {

    async execute(contacts: IRawContacts[]): Promise<string> {
        try {
            const json = {
                contactPhones: contacts.map(item => ({ alias: item.name, phoneNumber: item.phones[0] }))
            }

            let response = await api.post('/contacts', json)
            if (!response)
                response = await api.post('/contacts', json)

            if (response.status === 200) {
                const { data }: { data: IGenerateFriendListResponse } = response

                return data.message
            }

            throw new Error("Error occurred to create a friendlist on api")
        } catch (error) {
            throw new Error(error.message)
        }
    }

}