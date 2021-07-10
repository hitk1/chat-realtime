import { CloseEvent } from 'reconnecting-websocket/dist/events'
import { IDirectPayload } from '../../utils/interfaces'

export interface IWsClientBehavior {
    onClose(reason: CloseEvent): void
    token: string
}

export interface IWsClientConnection {
    authenticate(phoneNumber: string): void
    direct(payload: IDirectPayload): void
    onMessage(callback: (data: any) => any): void
}

export interface IDirectMessage {
    to: string
    message: string
}

export type BasicStruct<T = unknown> = {
    operation: "auth" | "direct",
    token: string
    data: T
}

export type WsResponse<T = unknown> = {
    operation: "authenticated",
    data: T
}