import { Database } from '@nozbe/watermelondb'
// import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

// import AppSchema from './schema'

// import BrokerModel from './models/Broker'
// import UserModel from './models/User'
// import BrokerageNotePending from './models/BrokerageNotes/Pending'

// export let database: Database

// export const watermelonDBinit = () => {

//     const adapter = new SQLiteAdapter({
//         schema: AppSchema,
//         dbName: 'meuir'
//     })

//     database = new Database({
//         adapter,
//         modelClasses: [
//             UserModel,
//             BrokerModel,
//             BrokerageNotePending,
//         ],
//         actionsEnabled: true,
//     })
// }