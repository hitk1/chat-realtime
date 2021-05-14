import { tableSchema } from "@nozbe/watermelondb"

export const SNMessages = 'messages'

export default tableSchema({
    name: SNMessages,
    columns: [
        { name: 'message_id', type: 'string', isIndexed: true },
        { name: 'to', type: 'string', isIndexed: true },
        { name: 'message', type: 'string' },
        { name: 'status', type: 'number' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
    ]
})