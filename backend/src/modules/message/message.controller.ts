import { Request, Response } from 'express'

import { ICreateMessageRequest } from './message.interfaces'
import MessageService from './message.service'

const messageService = new MessageService()

export default class MessageController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const { message, userId, toUserPhone } = request.body as ICreateMessageRequest
            const { _id } = await messageService.createMessage(message, userId, toUserPhone)

            return response.json({ messageId: _id })
        } catch (error) {
            return response.status(401).json({ message: error.message })
        }
    }
}