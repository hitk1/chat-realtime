import React, { forwardRef } from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import { useField } from '@unform/core'

import { colors } from '../../utils/configs';

import { IInputElementRef, IInputProps, IInputValueRef } from './interfaces';
import styles from './styles'

const FlatInput: React.ForwardRefRenderFunction<IInputElementRef, IInputProps> = ({ name, onChangeText, rawValue, ...restInputProps }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [isFilled, setIsFilled] = React.useState(false)

    const { registerField, defaultValue = '', fieldName, error } = useField(name)

    const inputRef = React.useRef<any>(null)
    const inputValueRef = React.useRef<IInputValueRef>({ value: defaultValue })

    React.useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current?.focus()
        },
        name: fieldName
    }), [])

    const handleOnTextChange = React.useCallback((text: string) => {
        if (inputRef.current)
            inputValueRef.current.value = text

        onChangeText && onChangeText(text)
    }, [onChangeText])

    const handleOnFocus = React.useCallback((isFocused: boolean) => {
        setIsFocused(isFocused)

        if (!isFocused)
            setIsFilled(!!inputValueRef.current?.value)
    }, [])

    React.useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(_, value: string) {
                inputValueRef.current.value = value
                inputRef.current.setNativeProps({ text: value })
            },
            clearValue() {
                inputValueRef.current.value = ''
                inputRef.current.clear()
            }
        })
    }, [fieldName, registerField])

    return (
        <View style={[
            styles.container,
            {
                borderColor: isFocused ? colors.background : (!!error ? colors.error : '#D3D3D3')
            }
        ]}>
            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholderTextColor={isFocused ? colors.background : '#A0A0A0'}
                onChangeText={handleOnTextChange}
                defaultValue={defaultValue}
                onFocus={() => handleOnFocus(true)}
                onBlur={() => handleOnFocus(false)}
                {...restInputProps}
            />
        </View>
    )
}

export default forwardRef(FlatInput);