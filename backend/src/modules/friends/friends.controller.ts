import { Request, Response } from 'express'
import { ILinkAllFriends } from './friends.interfaces'
import FriendsService from './friends.service'

const friendsService = new FriendsService()

export default class FriendsController {
    async linkAllFriends(request: Request, response: Response): Promise<Response> {
        try {
            const { me, friendPhones } = request.body as ILinkAllFriends
            const { _id } = await friendsService.linkAllFriends(me, friendPhones)

            return response.json({ id: _id })
        } catch (error) {
            return response.status(401).json({ message: error.message })
        }
    }
}