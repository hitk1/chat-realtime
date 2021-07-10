import ReconnectingWebSocket from "reconnecting-websocket";
import { IWsClientConnection } from "../../shared/services/WebSocket/interfaces";

export interface IDirectArrivedResponseData {
    key: string
    message_id: string
}

export interface IDirectReceivedData {
    from: string
    inserted_at: string
    message: string
    message_id: string
}

export interface ISocketContext {
    // socket: IWsClientConnection,
    socket: ReconnectingWebSocket
}