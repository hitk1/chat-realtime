import { Q } from '@nozbe/watermelondb'

import { database } from "../../../../../shared/infra/database";
import MessagesModel from "../../../../../shared/infra/database/models/Messages";
import { SNMessages } from "../../../../../shared/infra/database/schema/Messages";

export class UpdateStatusMessage {

    async execute(messageId: string, status: number): Promise<boolean> {
        try {
            const messageCollection = database.get<MessagesModel>(SNMessages)

            await database.action(async () => {
                const messageRecord = await messageCollection.query(
                    Q.where("message_id", messageId)
                ).fetch()

                await messageRecord[0].update(message => {
                    message.status = status
                })
            })

            return true
        } catch (error) {
            console.log(`Erro ao atualizar o status da mensagem: ${error.message}`)
            return false
        }
    }
}