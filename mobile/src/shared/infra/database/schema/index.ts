import { appSchema } from '@nozbe/watermelondb'

import ContactsSchema from './Contacts'
import MessagesSchema from './Messages'

export default appSchema({
    version: 1,
    tables: [
        ContactsSchema,
        MessagesSchema,
    ]
})