import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import AppSchema from './schema'

import ContactsModel from './models/Contacts'
import MessagesModel from './models/Messages'

export let database: Database

export const watermelonDBinit = () => {

    const adapter = new SQLiteAdapter({
        schema: AppSchema,
        dbName: 'chat'
    })

    database = new Database({
        adapter,
        modelClasses: [
            ContactsModel,
            MessagesModel,
        ],
        actionsEnabled: true,
    })
}