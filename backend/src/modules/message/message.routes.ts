import { Router } from 'express'

import MessageController from './message.controller'

const messageController = new MessageController()
const messageRoutes = Router()

messageRoutes.post('/', messageController.create)

export default messageRoutes