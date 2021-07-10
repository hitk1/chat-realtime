import MessagesModel from "../../../../../shared/infra/database/models/Messages";

export interface IProps {
    message: MessagesModel
    myPhone: string
}