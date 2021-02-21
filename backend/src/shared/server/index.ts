import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import connectToDatabase from '../database'
import routes from './routes'

(async () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(morgan('tiny'))
    app.use(routes)

    connectToDatabase()
        .then(() => {
            app.listen(3333, () => {
                console.log('Server online: 3333')
            })
        })
})()