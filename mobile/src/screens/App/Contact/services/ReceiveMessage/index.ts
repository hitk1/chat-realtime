import { IDirectReceivedData } from "../../../../../hooks/socket/interfaces";
import { database } from "../../../../../shared/infra/database";
import MessagesModel from "../../../../../shared/infra/database/models/Messages";
import { SNMessages } from "../../../../../shared/infra/database/schema/Messages";


export class ReceiveMessage {

    async execute(myPhoneNumber: string, data: IDirectReceivedData): Promise<MessagesModel> {
        const messageCollection = database.get<MessagesModel>(SNMessages)
        let receivedMessage: any

        await database.action(async () => {
            const localReceivedMessage = await messageCollection.create(newMessage => {
                newMessage.to = myPhoneNumber
                newMessage.from = data.from
                newMessage.key = data.message_id
                newMessage.message_id = data.message_id
                newMessage.message = data.message
                newMessage.status = 1   //Mensagem ja é criada localmente como 'recebido'
                newMessage.created_at = new Date(data.inserted_at).getTime()
                newMessage.created_at = new Date(data.inserted_at).getTime()
            })

            receivedMessage = localReceivedMessage
        })

        return receivedMessage as MessagesModel
    }
}