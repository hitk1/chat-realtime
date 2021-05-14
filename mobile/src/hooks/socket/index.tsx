import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import WsConnection from '../../shared/services/WebSocket/webSocketClient'
import { IWsClientConnection } from '../../shared/services/WebSocket/interfaces'
import { usePhoneAuth } from '../phone'

import { ISocketContext } from './interfaces'
import api from '../../shared/services/api'

const SocketContext = createContext({} as ISocketContext)

const SocketProvider: React.FC = ({ children }) => {
    const { user, signIn } = usePhoneAuth()
    const [conn, setConn] = useState({} as IWsClientConnection)

    const onReceiveMessage = useCallback((operation: string, data: string) => {
        switch (operation) {
            case 'auth':
                const { token } = JSON.parse(data) as { token: string }

                api.defaults.headers.authorization = `Bearer ${token}`
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

    api.interceptors.response.use(
        async response => { return response },
        async error => {
            if (error.response.status == 401) {
                try {
                    return conn.authenticate(user.phoneNumber)
                } catch (error) {
                    throw new Error(error)
                }
            } else
                return error.response
        }
    )

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