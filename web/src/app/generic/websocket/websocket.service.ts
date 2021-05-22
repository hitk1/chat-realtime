import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { AppConfig } from 'src/app/app.config';
import { BasicStruct, IDirectMessage, IWsClientConnection } from './websocket.interfaces';

@Injectable()
export class WebSocketService {

    constructor(public http: HttpClient, public router: Router) { }

    public connectSocket(): Promise<IWsClientConnection> {
        const heartbeatInterval = 10 * 1000
        const wsTimeout = 15 * 1000

        return new Promise((resolve, reject) => {

            const socket = new ReconnectingWebSocket(
                `ws://${AppConfig.configParams.api.apiIP}/ws`,
                [],
                {
                    WebSocket,
                    connectionTimeout: wsTimeout
                }
            );

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

            const send = (content: string): void => {
                socket.send(content)
            }

            socket.onclose = (error) => {
                if (error.code === 4001) {
                    socket.close();
                } else if (error.code === 4003) {
                    socket.close();
                } else if (error.code === 4004) {
                    socket.close();
                }
                reject(error)
            };

            const connection = {
                authenticate: auth,
                direct: sendDirect,
            } as IWsClientConnection

            socket.onmessage = ({ data }) => {
                if (data === 'pong')
                    return

                const { operation, data: wsData } = JSON.parse(data) as { operation: string, data: any }
                console.log(operation, wsData)
                // socket.onmessage(operation, wsData) onMessage()
            };

            resolve(connection)

            //hearbeat function
            socket.onopen = () => {
                const id = setInterval(() => {
                    console.log("ping");

                    if (socket.readyState === socket.CLOSED)
                        clearInterval(id)
                    else
                        socket.send("ping")
                }, heartbeatInterval)
            };

        });

    }
}
