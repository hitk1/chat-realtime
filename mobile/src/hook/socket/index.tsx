import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePhoneAuth } from '../phone'
import { IWsClientConnection } from '../../../../clientWs/src/interfaces'
import WsConnection from '../../../../clientWs/src/'

import { ISocketContext } from './interfaces'

const SocketContext = createContext({} as ISocketContext)

const SocketProvider: React.FC = ({ children }) => {
    const { user } = usePhoneAuth()
    const [conn, setConn] = useState({} as IWsClientConnection)


    useEffect(() => {
        WsConnection(user.phoneNumber)
            .then(socket => {
                setConn(socket)
            })
            .catch(error => {
                console.log(`Erro de conexão com websocket: ${error.message}`)
            })
    }, [user.phoneNumber])

    return (
        <SocketContext.Provider value={{ socket: conn }} >
            {children}
        </SocketContext.Provider>
    )
}

const useSocket = (): ISocketContext => {
    const context = useContext(SocketContext)

    if(!context)
        throw new Error('Erro desconhecido ao criar o contexto')
    
    return context
}

export {SocketProvider, useSocket}