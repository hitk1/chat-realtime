import mongoose from 'mongoose'
import { collectionName as SNUser } from '../user/user.interfaces'

export const collectionName = 'message'

export interface ICreateMessageRequest {
    userId: mongoose.Schema.Types.ObjectId,
    message: string
    toUserPhone: string
}

export interface IMessage extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId
    message: string
    toUser: mongoose.Schema.Types.ObjectId
}

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: SNUser
    },
    message: { type: String },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: SNUser
    }
})

messageSchema.index({ userId: 1, toUser: 1 })

export const messageModel = mongoose.model<IMessage>(collectionName, messageSchema, collectionName)