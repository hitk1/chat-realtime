import { Router } from 'express'

import UserController from './user.controller'

const userController = new UserController()
const userRoutes = Router()

//CreateUser
userRoutes.post('/', userController.create)

export default userRoutes