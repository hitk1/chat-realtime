import { Router } from 'express'
import FriendsController from './friends.controller'

const friendsController = new FriendsController()
const friendsRoutes = Router()

friendsRoutes.post('/linkFriends', friendsController.linkAllFriends)

export default friendsRoutes