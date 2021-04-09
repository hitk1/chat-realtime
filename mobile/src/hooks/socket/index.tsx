import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePhoneAuth } from '../phone'
// import { IWsClientConnection } from '../../../../clientWs/src/interfaces'
// import WsConnection from '../../../../clientWs/src'
import {IWsClientConnection} from '../../services/WebSocket/interfaces'
import WsConnection from '../../services/WebSocket/webSocketClient'

import { ISocketContext } from './interfaces'

const SocketContext = createContext({} as ISocketContext)

const SocketProvider: React.FC = ({ children }) => {
    const { user } = usePhoneAuth()
    const [conn, setConn] = useState({} as IWsClientConnection)


    useEffect(() => {
        WsConnection("17988037000")
            .then(socket => {
                setConn(socket)
                socket.authenticate("17988037000")
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