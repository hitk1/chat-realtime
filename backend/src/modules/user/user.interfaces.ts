import mongoose from "mongoose";

export const collectionName = 'user'

export interface ICreateUserRequest {
    name: string
    phoneNumber: string
}

export interface IUser extends mongoose.Document {
    name: string
    phoneNumber: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    phoneNumber: {
        type: String,
        index: true,
        unique: true
    }
})

export const userModel = mongoose.model<IUser>(collectionName, userSchema, collectionName)