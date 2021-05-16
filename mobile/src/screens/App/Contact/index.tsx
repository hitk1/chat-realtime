import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import FlatInput from '../../../components/FlatInput';
import Message from './components/Message'

import AvatarIcon from '../../../assets/avatar.svg'
import { defaultHitSlop } from '../../../shared/utils/configs';
import { IContacts, ITextInputProps } from '../../../shared/utils/interfaces';

import styles from './styles'
import messages from '../../../assets/messages.json'

const Contact: React.FC = ({ }) => {
  const { params } = useRoute()
  const { goBack } = useNavigation()
  const { name } = params as IContacts

  const formRef = useRef<FormHandles>(null)
  const newMessageRef = useRef<ITextInputProps>(null)

  const handleGoBack = useCallback(() => goBack(), [])

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

      <KeyboardAvoidingView style={styles.keyboardAvoindingView}>
        <FlatList
          data={messages.data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }: { item: any, index: number }) => {
            return (
              <Message
                data={item}
              />
            )
          }}
        />
        <Form
          ref={formRef}
          onSubmit={() => { console.log('do something') }}
        >
          <FlatInput
            ref={newMessageRef}
            name="newMessage"
            placeholder="Digite aqui sua mensagem"
            autoCorrect={false}
            autoCapitalize="sentences"
            numberOfLines={1}
            maxLength={100}
            returnKeyType="send"
            onSubmitEditing={() => { console.log('do something') }}
          />
        </Form>
      </KeyboardAvoidingView>
    </View>
  );
}

export default Contact;