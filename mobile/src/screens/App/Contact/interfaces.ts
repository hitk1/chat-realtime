import { IMessage } from "./services/CreateMessage/interfaces";

export interface IFormData {
    newMessage: string
}

export interface IMessagesState {
    [x: string]: IMessage;
}