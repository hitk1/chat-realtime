export interface IMessage {
    id: string
    to: string
    from: string
    message: string
}

export interface IProps {
    data: IMessage
}