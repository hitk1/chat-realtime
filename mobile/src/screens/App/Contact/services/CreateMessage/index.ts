import { create } from "yup/lib/Reference";
import { database } from "../../../../../shared/infra/database";
import MessagesModel from "../../../../../shared/infra/database/models/Messages";
import { SNMessages } from "../../../../../shared/infra/database/schema/Messages";
import { ICreateMessage } from "./interfaces";

export class CreateMessage {

    async execute(message: ICreateMessage): Promise<MessagesModel> {
        const messageCollection = database.get<MessagesModel>(SNMessages)
        let persistedMessage: any

        await database.action(async () => {
            const createdMessage = await messageCollection.create(newMessage => {
                newMessage.from = message.from
                newMessage.to = message.to
                newMessage.message = message.message
                newMessage.key = message.key
                newMessage.status = 0
                newMessage.created_at = new Date().getTime()
                newMessage.updated_at = new Date().getTime()
            })

            persistedMessage = createdMessage
        })

        return persistedMessage as MessagesModel
    }
}