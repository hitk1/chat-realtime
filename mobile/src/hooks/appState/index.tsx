import React, { createContext, useContext, useState } from 'react';
import { IAppStateContext } from './interfaces'

const AppStateContext = createContext({} as IAppStateContext)

const AppStateProvider: React.FC = ({ children }) => {
    const [firstFetch, setFirstFetch] = useState(false)

    return (
        <AppStateContext.Provider value={{
            firstFetch,
            setFirstFetch
        }}>
            {children}
        </AppStateContext.Provider>
    )
}

const useAppState = (): IAppStateContext => {
    const context = useContext(AppStateContext)

    if (!context)
        throw new Error('Erro desconhecido na criação do contexto')

    return context
}

export { AppStateProvider, useAppState }