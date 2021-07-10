import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { v4 as uuid } from 'uuid'

import FlatInput from '../../../components/FlatInput';
import EnhancedMessage from './components/EnhancedMessage';

import AvatarIcon from '../../../assets/avatar.svg'
import { defaultHitSlop } from '../../../shared/utils/configs';
import { IContacts, IDirectPayload, ITextInputProps } from '../../../shared/utils/interfaces';

import styles from './styles'
import { useSocket } from '../../../hooks/socket';
import { IFormData } from './interfaces';
import { usePhoneAuth } from '../../../hooks/phone';
import { LoadMessages } from './services/LoadMessages';
import { CreateMessage } from './services/CreateMessage';
import MessagesModel from '../../../shared/infra/database/models/Messages';

const Contact: React.FC = ({ }) => {
    const { params } = useRoute()
    const { goBack } = useNavigation()
    const { name, phoneNumber } = params as IContacts

    const { socket } = useSocket()
    const { token, user } = usePhoneAuth()

    const [messages, setMessages] = useState<MessagesModel[]>([])

    const formRef = useRef<FormHandles>(null)
    const newMessageRef = useRef<ITextInputProps>(null)

    const handleGoBack = useCallback(() => goBack(), [])

    const pushNewMessageToMessagesState = useCallback((newMessage: MessagesModel) => {
        setMessages(oldValues => [
            ...oldValues,
            newMessage
        ])
    }, [messages])

    const handleSend = useCallback(async (data: IFormData) => {
        const { newMessage } = data

        if (!newMessage || newMessage === '')
            return

        const createLocalMessage = new CreateMessage()
        const key = uuid()

        const persistedLocalMessage = await createLocalMessage.execute(
            {
                from: user.phoneNumber,
                to: phoneNumber,
                key,
                message: newMessage,
            }
        )

        pushNewMessageToMessagesState(persistedLocalMessage)

        const payload = {
            operation: 'direct',
            auth: token,
            data: {
                to: phoneNumber,
                message: newMessage,
                key
            }
        } as IDirectPayload

        socket.send(JSON.stringify(payload))

        formRef.current?.clearField('newMessage')
    }, [])

    useEffect(() => {
        const loadMessagesService = new LoadMessages()

        loadMessagesService.execute(phoneNumber)
            .then(messages => setMessages(messages as any))

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeftContainer}>
                    <TouchableOpacity
                        hitSlop={defaultHitSlop}
                        onPress={handleGoBack}
                    >
                        <MCIcon name="arrow-left" size={32} color='white' />
                    </TouchableOpacity>

                    <View style={styles.avatarBackgroundContainer}>
                        <View style={styles.avatarContainer}>
                            <AvatarIcon />
                        </View>
                    </View>
                    <Text style={styles.userName}>{name}</Text>
                </View>
            </View>


            {messages.length > 0
                && <FlatList
                    style={styles.listMessages}
                    showsVerticalScrollIndicator={false}
                    data={messages}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }: { item: MessagesModel, index: number }) => (
                        <EnhancedMessage
                            key={index}
                            message={item}
                            myPhone={user.phoneNumber}
                        />
                    )}
                />
            }
            <KeyboardAvoidingView style={styles.keyboardAvoindingView}>
                <Form
                    style={styles.formContainer}
                    ref={formRef}
                    onSubmit={handleSend}
                >
                    <View style={styles.inputContainer}>
                        <FlatInput
                            ref={newMessageRef}
                            name="newMessage"
                            placeholder="Digite aqui sua mensagem"
                            autoCorrect={false}
                            autoCapitalize="sentences"
                            numberOfLines={3}
                            maxLength={100}
                            returnKeyType="send"
                            onSubmitEditing={() => formRef.current?.submitForm()}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => formRef.current?.submitForm()}
                    >
                        <MCIcon name="send" color="#FFF" size={35} />
                    </TouchableOpacity>
                </Form>
            </KeyboardAvoidingView>
        </View>
    );
}

export default Contact;