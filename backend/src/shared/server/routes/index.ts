import express from 'express'

import userRoutes from '../../../modules/user/user.routes'
import messageRoutes from '../../../modules/message/message.routes'
import friendsRoutes from '../../../modules/friends/friends.routes'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/messages', messageRoutes)
router.use('/friends', friendsRoutes)

export default router