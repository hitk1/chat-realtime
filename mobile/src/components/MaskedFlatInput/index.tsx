import { useField } from '@unform/core';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { TextInputMask,  } from 'react-native-masked-text'

import FlatInput from '../FlatInput'
import { Props } from './interfaces'

const MaskedFlatInput: React.FC<Props> = ({ type, options, refInput, ...rest }) => {

    const [value, setValue] = React.useState('')
    const [rawValue, setRawValue] = React.useState('')

    const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
        setValue(maskedValue)
        setRawValue(unmaskedValue)
    }, [value, rawValue])
    
    return (
        <TextInputMask
            type={type}
            options={options && options}
            includeRawValueInChangeText
            onChangeText={handleOnChangeText}
            value={value}
            customTextInput={FlatInput}
            customTextInputProps={{ 
                rawValue,
                ref: refInput,
                ...rest
             }}
            {...rest}
        />
    )
}

export default MaskedFlatInput