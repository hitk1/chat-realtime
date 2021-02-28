export interface IInputValueRef {
    value: string
}

export interface IInputElementRef {
    focus(): void
    name: string
}

export interface IInputProps {
    name: string,
    onChangeText?(text: string): void
    rawValue?: string
}