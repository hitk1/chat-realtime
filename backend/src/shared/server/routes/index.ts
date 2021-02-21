import express from 'express'

import userRoutes from '../../../modules/user/user.routes'
import messageRoutes from '../../../modules/message/message.routes'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/messages', messageRoutes)

export default router