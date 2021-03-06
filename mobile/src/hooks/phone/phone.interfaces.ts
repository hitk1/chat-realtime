export interface IUser {
    _id: string
    name: string
    phoneNumber: string
}

export interface IPhoneContext {
    user: IUser
    signIn(token: string): Promise<void>
    signOut(): Promise<void>
    persistUser(user: IUser): Promise<void>
}