import { tableSchema } from '@nozbe/watermelondb'

export const SNContacts = 'contacts'

export default tableSchema({
    name: SNContacts,
    columns: [
        { name: 'name', type: 'string' },
        { name: 'last_name', type: 'string'},
        { name: 'cpf', type: 'string' },
        { name: 'phone', type: 'string'},
        { name: 'email', type: 'string'},
        { name: 'password', type: 'string' },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' }
    ]
})