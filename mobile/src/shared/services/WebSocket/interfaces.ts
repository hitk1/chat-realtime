import { CloseEvent } from 'reconnecting-websocket/dist/events'

export interface IWsClientBehavior {
    onClose(reason: CloseEvent): void
    token: string
}

export interface IWsClientConnection {
    authenticate(phoneNumber: string): void
    direct(to: string, message: string): void
    onMessage(data: unknown): void
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