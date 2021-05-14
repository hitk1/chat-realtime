import { TextInput } from "react-native";

export interface ITextInputProps extends TextInput {
    name: string
}

export interface IService {
    execute(params: unknown): unknown
}