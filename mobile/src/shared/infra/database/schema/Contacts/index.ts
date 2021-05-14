import { tableSchema } from '@nozbe/watermelondb'

export const SNContacts = 'contacts'

export default tableSchema({
    name: SNContacts,
    columns: [
        { name: 'name', type: 'string' },
        { name: 'phoneNumber', type: 'string', isIndexed: true }
    ]
})