import React, { createContext, useContext } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { IPhoneContext, IUser } from './phone.interfaces'

import api from '../../services/api'

const PhoneContext = createContext<IPhoneContext>({} as IPhoneContext)

const PhoneProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<IUser>({} as IUser)

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

    const signIn = React.useCallback(async (name: string, phoneNumber: string) => {
        try {

            const response = await api.post('/user', { name, phoneNumber })

            if (response.status === 200) {
                const { _id, name, phoneNumber } = response.data as IUser

                await AsyncStorage.setItem('@Chat-Realtime:user', JSON.stringify({ _id, name, phoneNumber }))
                setUser({ _id, name, phoneNumber })
            } else
                throw new Error(JSON.stringify(response))

        } catch (error) {
            console.log('Erro', error.message)
            throw new Error(error.message)
        }
    }, [])

    return (
        <PhoneContext.Provider value={{ user, signIn }}>
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