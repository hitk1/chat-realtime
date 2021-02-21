import { IUser, userModel } from "./user.interfaces";

class UserService {

    async createUser(name: string, phoneNumber: string): Promise<IUser> {
        try{
            const createdUser = await userModel.create({ name, phoneNumber })

            return createdUser
        } catch(error){

            if(error.message.indexOf('dup key') !== -1)
                throw new Error('Numero de telefone já cadastrado.')
            throw new Error(error.message)
        }
    }


}

export default UserService