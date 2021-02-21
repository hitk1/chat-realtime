import { Schema } from "mongoose";
import { userModel } from "../user/user.interfaces";
import { IMessage, messageModel } from "./message.interfaces";

class MessageService {
    async createMessage(message: string, userId: Schema.Types.ObjectId, toUserPhone: string): Promise<IMessage> {
        try {
            const toUser = await userModel.findOne({ phoneNumber: toUserPhone })

            if (!toUser)
                throw new Error('Usuário não localizado no banco de dados')

            const createdMessage = await messageModel.create({
                userId,
                message,
                toUser: toUser._id
            })

            return createdMessage
        } catch (error) {
            throw new Error(error.message)
        }
    }


}

export default MessageService