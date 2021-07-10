import { Q } from '@nozbe/watermelondb'

import { database } from "../../../../../shared/infra/database"
import MessagesModel from "../../../../../shared/infra/database/models/Messages"
import { SNMessages } from "../../../../../shared/infra/database/schema/Messages"

export class LoadMessages {

    execute(phoneNumber: string): Promise<MessagesModel[]> {
        return new Promise(async resolve => {
            const messagesCollection = database.get<MessagesModel>(SNMessages)

            await database.action(async () => {

                const messages = await messagesCollection.query(
                    Q.or(
                        Q.where('to', phoneNumber),
                        Q.where('from', phoneNumber),
                    ),
                    Q.experimentalSortBy('created_at', Q.asc)
                ).fetch()

                resolve(messages)
            })
        })
    }
}