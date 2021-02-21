export interface IUser {
    _id: string
    name: string
    phoneNumber: string
}

export interface IPhoneContext {
    user: IUser
    signIn(name: string, phoneNumber: string): Promise<void>
}