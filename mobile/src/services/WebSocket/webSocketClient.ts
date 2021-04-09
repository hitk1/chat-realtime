import WebSocket from 'isomorphic-ws'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { BasicStruct, IDirectMessage, IWsClientBehavior, IWsClientConnection, WsResponse } from './interfaces'

export const heartbeatInterval = 10 * 1000
export const wsTimeout = 15 * 1000

//{ onClose, token }: IWsClientBehavior
export default (phoneNumber: string): Promise<IWsClientConnection> => {
    // export const ws = ({ onClose }: IWsClientConnection): Promise<any> => {
    return new Promise((resolve, reject) => {

        const socket = new ReconnectingWebSocket(
            'ws://192.168.0.111:3334/ws',
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

        const sendDirect = (to: string, message: string) => {
            const json = {
                operation: 'direct',
                // token,
                data: {
                    to,
                    message
                }
            } as BasicStruct<IDirectMessage>

            send(JSON.stringify(json))
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
            direct: sendDirect,
        } as IWsClientConnection

        socket.addEventListener("message", ({ data }) => {
            if (data === 'pong')
                return

            // const struct = JSON.parse(data) as WsResponse
            // connection.onMessage(struct)
            const message = data
            console.log(message)
            // connection.onMessage(message) 
        }) 

        resolve(connection)

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