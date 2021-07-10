import WebSocket from 'isomorphic-ws'
// import WebSocket from 'ws'
import ReconnectingWebSocket from 'reconnecting-websocket'

import { BasicStruct, IDirectMessage, IWsClientBehavior, IWsClientConnection, WsResponse } from './interfaces'
import { apiIP } from '../../utils/configs'
import { IDirectPayload } from '../../utils/interfaces'

export const heartbeatInterval = 10 * 1000
export const wsTimeout = 15 * 1000


export default (): Promise<ReconnectingWebSocket> => {
    return new Promise((resolve, reject) => {

        const socket = new ReconnectingWebSocket(
            `ws://${apiIP}:3334/ws`,
            [],
            {
                WebSocket,
                connectionTimeout: wsTimeout
            }
        )


        const auth = (phoneNumber: string) => {
            const json = {
                operation: 'auth',
                data: {
                    phoneNumber
                }
            } as BasicStruct

            send(JSON.stringify(json))
        }

        const sendDirect = (payload: IDirectPayload) => {
            send(JSON.stringify(payload))
        }

        // Private method
        const send = (content: string): void => {
            socket.send(content)
        }

        socket.addEventListener("close", error => {
            if (error.code === 4001) {
                socket.close();
            } else if (error.code === 4003) {
                socket.close();
            } else if (error.code === 4004) {
                socket.close();
            }
            reject(error)
        })

        const connection = {
            authenticate: auth,
            direct: sendDirect
        } as IWsClientConnection

        // socket.addEventListener("message", ({ data }) => {
        //     if (data === 'pong')
        //         return
        // })

        // resolve(connection)
        resolve(socket)

        //hearbeat function
        socket.addEventListener("open", () => {
            const id = setInterval(() => {
                if (socket.readyState === socket.CLOSED)
                    clearInterval(id)
                else
                    socket.send("ping")
            }, heartbeatInterval)
        })
    })
}