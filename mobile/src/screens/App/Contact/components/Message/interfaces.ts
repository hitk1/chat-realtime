import { IMessagesState } from "../../interfaces";

export interface IMessage {
    id: string
    to: string
    from: string
    message: string
}

export interface IProps {
    data: IMessagesState,
    myPhone: string
}