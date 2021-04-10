import { TextInputProps } from "react-native";
import { TextInputMaskOptionProp, TextInputMaskTypeProp } from "react-native-masked-text";

export interface IInputRef {
    value: any
    focus(): void
    name: string
}

export interface Props extends TextInputProps {
    type: TextInputMaskTypeProp
    name: string
    onChangeText?(value: string): void
    rawValue?: string
    refInput: any
    options?: TextInputMaskOptionProp
}