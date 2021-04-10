import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import WsConnection from '../../services/WebSocket/webSocketClient'
import { IWsClientConnection } from '../../services/WebSocket/interfaces'
import { usePhoneAuth } from '../phone'

import { ISocketContext } from './interfaces'

const SocketContext = createContext({} as ISocketContext)

const SocketProvider: React.FC = ({ children }) => {
    const { user, signIn } = usePhoneAuth()
    const [conn, setConn] = useState({} as IWsClientConnection)

    const onReceiveMessage = useCallback((operation: string, data: string) => {
        switch (operation) {
            case 'auth':
                const { token } = JSON.parse(data) as { token: string }
                signIn(token)
                break
            default: break
        }
    }, [])

    useEffect(() => {
        if (user?.phoneNumber)
            WsConnection(onReceiveMessage)
                .then(socket => {
                    socket.authenticate(user.phoneNumber)
                    setConn(socket)
                })
                .catch(error => {
                    console.log(`Erro de conexão com websocket: ${error.message}`)
                })
    }, [user])

    return (
        <SocketContext.Provider value={{ socket: conn }} >
            {children}
        </SocketContext.Provider>
    )
}

const useSocket = (): ISocketContext => {
    const context = useContext(SocketContext)

    if (!context)
        throw new Error('Erro desconhecido ao criar o contexto')

    return context
}

export { SocketProvider, useSocket }