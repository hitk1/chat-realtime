import { TextInputProps } from "react-native";

export interface IInputValueRef {
    value: string
}

export interface IInputElementRef {
    focus(): void
    name: string
}

export interface IInputProps extends TextInputProps{
    name: string,
    onChangeText?(text: string): void
    rawValue?: string
}