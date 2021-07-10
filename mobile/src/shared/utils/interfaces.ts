import { TextInput } from "react-native";
import { IContactsResponse } from "../services/UpdateContactsList/interfaces";

export interface ITextInputProps extends TextInput {
    name: string
}

export interface IService {
    execute(params: unknown): unknown
}

export interface IContacts extends IContactsResponse {
    id: string
}

type DirectOperationName = 'direct'
export interface IDirectPayload {
    operation: DirectOperationName,
    auth: string
    data: {
        to: string,
        message: string
    }
}