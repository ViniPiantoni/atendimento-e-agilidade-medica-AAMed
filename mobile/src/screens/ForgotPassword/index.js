import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Alert } from 'react-native';

import { MainButton } from '../../components/MainButton';

import {
  Keyboard,
  Container,
  TopContainer,
  Title,
  BoxDescription,
  Description,
  Label,
  Input,
  ButtonResetText,
  BottomContainer,
  BottomContainerText,
  BottomContainerTextTouch,
} from './styles';

export default function ForgotPasword() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  function handleSubmit() {
    if (email === '') {
      return Alert.alert('Aviso', 'Preencha o campo de e-mail.');
    }
    console.log(email);
  }

  return (
    <Keyboard keyboardVerticalOffset={0} behavior="padding" enabled={false}>
      <Container>
        <TopContainer>
          <Title>Esqueceu a senha?</Title>
          <BoxDescription>
            <Description>
              {`Digite seu endereço de e-mail
        e enviaremos um link
      para redefinir sua senha`}
            </Description>
          </BoxDescription>
        </TopContainer>

        <View>
          <Label>E-mail</Label>
          <Input
            autoFocus
            autoCapitalize="none"
            placeholder="jose.silva@mail.com"
            placeholderTextColor="#00000066"
            keyboardType="email-address"
            selectionColor="#006bad66"
            onChangeText={setEmail}
            value={email}
          />

          <MainButton
            onPress={() => handleSubmit()}
            label={'Recuperar senha'}
          />
        </View>

        <BottomContainer>
          <BottomContainerText>Não tem uma conta?</BottomContainerText>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <BottomContainerTextTouch>Cadastre-se</BottomContainerTextTouch>
          </TouchableOpacity>
        </BottomContainer>
      </Container>
    </Keyboard>
  );
}
