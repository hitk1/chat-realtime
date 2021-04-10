import React, { createContext, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { IPhoneContext, IUser } from './phone.interfaces'

const PhoneContext = createContext<IPhoneContext>({} as IPhoneContext)

const PhoneProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<IUser | null>()

    React.useEffect(() => {
        const loadStorageDate = async () => {
            const user = await AsyncStorage.getItem('@Chat-Realtime:user')

            if (user) {
                const parsedUser = JSON.parse(user) as IUser

                setUser(parsedUser)
            }
        }

        loadStorageDate()
    }, [])

    const signIn = React.useCallback(async (token: string) => {
        try {
            await AsyncStorage.setItem('@Chat-Realtime:token', token)
        } catch (error) {
            console.log('Erro', error.message)
            throw new Error(error.message)
        }
    }, [])

    const persistUser = React.useCallback(async (user: IUser) => {
        try {
            await AsyncStorage.setItem('@Chat-Realtime:user', JSON.stringify(user))
            setUser(user)
        } catch (error) {
            throw new Error(error.message)
        }
    }, [])

    const signOut = React.useCallback(async () => {
        try {
            await AsyncStorage.removeItem('@Chat-Realtime:user')
            setUser(null)
        } catch (error) {
            throw new Error(error.message)
        }
    }, [])

    return (
        <PhoneContext.Provider value={{
            user: user as IUser,
            signIn,
            signOut,
            persistUser
        }}>
            {children}
        </PhoneContext.Provider>
    )
}

const usePhoneAuth = (): IPhoneContext => {
    const context = useContext(PhoneContext)

    if (!context)
        throw new Error('Erro desconhecido na criação do contexto')

    return context
}
export { PhoneProvider, usePhoneAuth }