import React, { useCallback, useEffect, useRef } from 'react';
import { View, Image, Alert } from 'react-native';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import { ValidationError } from 'yup'

import getValidationErrors from '../../../shared/services/GetValidationErros'
import { ITextInputProps } from '../../../shared/utils/interfaces';

import FlatInput from '../../../components/FlatInput'
import MaskedFlatInput from '../../../components/MaskedFlatInput'
import FlatButton from '../../../components/FlatButton'

import logo from '../../../assets/Logo.png'
import blueBorder from '../../../assets/blueBorder.png'

import { IFormData } from './interfaces';
import { useValidateFunctions } from './services/useValidateForm'
import createUser from './services/createUser'

import styles from './styles'
import { usePhoneAuth } from '../../../hooks/phone';

const SignIn: React.FC = () => {
    const { persistUser } = usePhoneAuth()
    const formRef = useRef<FormHandles>(null)
    const nameInputRef = useRef<ITextInputProps>(null)
    const phoneNumberInputRef = useRef<ITextInputProps>(null)

    const handleSubmit = useCallback(async (data: IFormData) => {
        try {
            formRef.current?.setErrors({})
            const { schema } = useValidateFunctions()

            await schema.validate(data, { abortEarly: false })
            const { name, phoneNumber } = data

            const userId = await createUser(
                name.trim(),
                phoneNumber.replace(/[()-]/g, '').replace(/\s/g, '')
            )

            await persistUser({
                _id: userId,
                name: name.trim(),
                phoneNumber: phoneNumber.replace(/[()-]/g, '').replace(/\s/g, '')
            })
        } catch (error) {
            if (error instanceof ValidationError)
                return formRef.current?.setErrors(getValidationErrors(error))

            Alert.alert('Oops!', error.message)
        }
    }, [formRef])

    useEffect(() => {
        nameInputRef.current?.focus()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Image
                    source={logo}
                    height={100}
                    width={100}
                    style={styles.logo}
                />
                <Form
                    ref={formRef}
                    style={styles.form}
                    onSubmit={handleSubmit}
                >
                    <View style={{ width: '100%', height: 'auto' }}>
                        <FlatInput
                            ref={nameInputRef}
                            name="name"
                            placeholder="Digite seu nome"
                            autoCorrect={false}
                            autoCapitalize="words"
                            keyboardType="name-phone-pad"
                            numberOfLines={1}
                            maxLength={50}
                            returnKeyType="next"
                            onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
                        />
                        <MaskedFlatInput
                            type="cel-phone"
                            refInput={phoneNumberInputRef}
                            name="phoneNumber"
                            placeholder="Digite seu telefone"
                            returnKeyType="send"
                            keyboardType="number-pad"
                            numberOfLines={1}
                            maxLength={15}
                            onSubmitEditing={() => formRef.current?.submitForm()}
                        />
                    </View>
                    <FlatButton onPress={() => formRef.current?.submitForm()}>
                        Join us!
                    </FlatButton>
                </Form>
            </View>
            <Image
                source={blueBorder}
                width={100}
                height={20}
                resizeMode="stretch"
                style={styles.bottomBlueEffect}
            />
        </View>
    )
}

export default SignIn;