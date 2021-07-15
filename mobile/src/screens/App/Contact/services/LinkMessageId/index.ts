import { Q } from '@nozbe/watermelondb'

import { database } from "../../../../../shared/infra/database";
import MessagesModel from "../../../../../shared/infra/database/models/Messages";
import { SNMessages } from "../../../../../shared/infra/database/schema/Messages";

export class LinkMessageId {

    async execute(key: string, messageId: string): Promise<void> {
        try {
            const messageCollection = database.get<MessagesModel>(SNMessages)

            await database.action(async () => {
                const messageRecord = await messageCollection.query(
                    Q.where("key", key)
                ).fetch()

                await messageRecord[0].update(message => {
                    message.message_id = messageId
                })
            })

            console.log('linked successfully')

        } catch (error) {
            console.log(`Erro ao incluir o id da mensagem: ${error.message}`)
        }
    }
}