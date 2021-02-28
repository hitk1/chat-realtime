import mongoose from "mongoose";

import { collectionName as SNUser } from '../user/user.interfaces'

export const collectionName = 'friends'

export interface ILinkAllFriends {
    me: mongoose.Schema.Types.ObjectId,
    friendPhones: string[]
}

export interface IFriends extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId,
    friends: mongoose.Schema.Types.ObjectId[]
}

const friendsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SNUser,
        index: true
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: SNUser,
        }
    ]
},
    { timestamps: true }
)

export const friendsModel = mongoose.model<IFriends>(collectionName, friendsSchema, collectionName)