import { Schema } from "mongoose";
import { userModel } from "../user/user.interfaces";
import { friendsModel, IFriends } from "./friends.interfaces";

export default class FriendsService {

    async linkAllFriends(me: Schema.Types.ObjectId, friendPhones: string[]): Promise<IFriends> {
        try {
            const user = await userModel.findById(me)
            if (!user)
                throw new Error('Usuário não localizado')

            const friendsIds = await this.getUserIdByPhones(friendPhones)
            const listFriends = await friendsModel.create({
                userId: me,
                friends: friendsIds
            })

            return listFriends
        } catch (error) {
            throw new Error(error.message)
        }
    }

    private async getUserIdByPhones(friendPhones: string[]): Promise<Schema.Types.ObjectId[]> {
        try {
            let result = []
            const users = await userModel.find({ phoneNumber: { $in: friendPhones } })

            result = users.map(item => item._id)

            return result
        } catch (error) {
            throw new Error(`Erro ao recuperar lista de ids de friends: ${error.message}`)
        }
    }

}