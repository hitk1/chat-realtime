import { Request, Response } from 'express'
import { ICreateUserRequest } from './user.interfaces'

import UserService from './user.service'

const userService = new UserService()

export default class UserController {
    async create(request: Request, response: Response): Promise<Response> {
        try {
            const {name, phoneNumber} = request.body as ICreateUserRequest
            const user = await userService.createUser(name, phoneNumber)

            return response.json(user)
        } catch (error) {
            return response.status(400).json({ message: error.message })
        }
    }
}