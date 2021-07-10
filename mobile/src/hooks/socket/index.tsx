import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'

import api from '../../shared/services/api'
import WsConnection from '../../shared/services/WebSocket/webSocketClient'
import { usePhoneAuth } from '../phone'
import { BasicStruct } from '../../shared/services/WebSocket/interfaces'

import { ISocketContext } from './interfaces'
import { onDirectArrived } from './services/OnDirectArrived'
import { onReceiveDirect } from './services/onReceivedDirect'

const SocketContext = createContext({} as ISocketContext)

const SocketProvider: React.FC = ({ children }) => {
    const { user, signIn } = usePhoneAuth()
    const [ws, setWs] = useState<ReconnectingWebSocket | null>(null)

    const authenticate = useCallback((phoneNumber: string) => {
        const json = {
            operation: 'auth',
            data: {
                phoneNumber
            }
        } as BasicStruct

        ws?.send(JSON.stringify(json))
    }, [ws])

    useEffect(() => {
        if (user?.phoneNumber)
            WsConnection()
                .then(socket => {
                    setWs(socket)
                })
                .catch(error => {
                    console.log(`Erro de conexão com websocket: ${error.message}`)
                })
    }, [user])

    useEffect(() => {
        if (!user)
            return

        authenticate(user.phoneNumber)
        ws?.addEventListener("message", ({ data }) => {
            if (data === 'pong')
                return
            const { operation, data: wsData } = JSON.parse(data) as { operation: string, data: any }

            switch (operation) {
                case "auth":
                    const { token } = JSON.parse(wsData) as { token: string }

                    api.defaults.headers.authorization = `Bearer ${token}`
                    signIn(token)
                    break
                case "direct":
                    onDirectArrived(JSON.parse(wsData))
                    break;

                case "notify_direct":
                    onReceiveDirect(user.phoneNumber, JSON.parse(wsData))

                default: break
            }

        })

        return () => ws?.removeEventListener("message", () => { })
    }, [ws])

    api.interceptors.response.use(
        async response => { return response },
        async error => {
            if (error.response.status == 401) {
                try {
                    if (user?.phoneNumber)
                        return authenticate(user.phoneNumber)
                } catch (error) {
                    throw new Error(error)
                }
            } else
                return error.response
        }
    )

    return (
        <SocketContext.Provider value={{
            socket: ws!
        }} >
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