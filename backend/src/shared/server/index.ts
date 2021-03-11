import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'express-async-errors';
import connectToDatabase from '../database'
import routes from './routes'
import { AppError } from '../errors/AppError';

(async () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(morgan('tiny'))
    app.use(routes)

    app.use(
        (err: Error, request: Request, response: Response, _next: NextFunction) => {
            if (err instanceof AppError)
                return response.status(err.statusCode).json({
                    message: err.message
                });

            return response.status(500).json({
                status: "Error",
                error: "Internal Error"
            })
        })

    await connectToDatabase();

    app.listen(3333, () => {
        console.log('Server online: 3333')
    })
})()