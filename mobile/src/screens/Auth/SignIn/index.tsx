import React, { useRef } from 'react';
import { View, Image } from 'react-native';
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'

import FlatInput from '../../../components/FlatInput'
import FlatButton from '../../../components/FlatButton'

import { ITextInputProps } from '../../../utils/interfaces';

import logo from '../../../assets/Logo.png'
import blueBorder from '../../../assets/blueBorder.png'
import styles from './styles'

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null)
    const nameInputRef = useRef<ITextInputProps>(null)
    const phoneNumberInputRef = useRef<ITextInputProps>(null)

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
                    onSubmit={() => { }}
                >
                    <View style={{ width: '100%', height: 'auto' }}>
                        <FlatInput
                            ref={nameInputRef}
                            name="name"
                            placeholder="Digite seu nome"
                            autoCorrect={false}
                            autoCapitalize="words"
                            keyboardType="name-phone-pad"
                            returnKeyType="next"
                            onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
                        />

                        <FlatInput
                            ref={phoneNumberInputRef}
                            name="phoneNumber"
                            placeholder="Digite seu telefone"
                            keyboardType="number-pad"
                            returnKeyType="send"
                            onSubmitEditing={() => formRef.current?.submitForm()}

                        />
                    </View>
                    <FlatButton>Join us!</FlatButton>
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