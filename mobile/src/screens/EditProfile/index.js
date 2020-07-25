import React, { useState, useEffect } from 'react';
import { Alert, Text, AsyncStorage } from 'react-native';

import api from '../../services/api';

import { EditBox, InputBox, Label, Input } from './styles';

import { MainButton } from '../../components/MainButton';
import { Header } from '../../components/Header';

export default function EditProfile({ navigation }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    function getUserLogged() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(AsyncStorage.getItem('store'));
        }, 1000);
      });
    }
    getUserLogged()
      .then(data => {
        const dataParse = JSON.parse(data);
        const { _id, name, email, bio } = dataParse.auth.user;
        // console.log(`// ${_id} // ${name} // ${email} // ${bio}`)
        setId(_id);
        setName(name);
        setEmail(email);
        setBio(bio);
      })
      .catch(err => console.log(err));
  }, []);

  async function onSubmit() {
    // PRECISA SAIR E ENTRAR PARA TER AS INFORMAÇÕES ATUALIZADAS
    try {
      await api.put(`/user/${id}`, {
        name,
        email,
        bio,
      });
      // melhorar a mensagem (talvez)
      navigation.navigate('Home');
      Alert.alert(
        'Perfil editado com sucesso!',
        'Faça logout e login para atualizar as informações no perfil'
      );
      // { headers: { Authorization: `Bearer ${token}` } }
      // console.log(id, name, email, bio, "response ", res)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log('Erro fora dos ifs ', error);
    }
  }

  return (
    <>
      <Header navigation={navigation} label={'EDITAR PERFIL'} />
      <EditBox>
        <InputBox>
          <Label>Nome</Label>
          <Input
            placeholder="Vinicius Fernando Piantoni"
            placeholderTextColor="#00000066"
            returnKeyType="next"
            selectionColor="#006bad66"
            onChangeText={e => setName(e)}
            value={name}
          />
        </InputBox>
        <InputBox>
          <Label>E-mail</Label>
          <Input
            placeholder="viniciuspiantoni@gmail.com"
            autoCapitalize="none"
            placeholderTextColor="#00000066"
            returnKeyType="next"
            selectionColor="#006bad66"
            onChangeText={e => setEmail(e)}
            value={email}
          />
        </InputBox>
        <InputBox>
          <Label>Bio</Label>
          <Input
            placeholder="Rinite e miopia"
            placeholderTextColor="#00000066"
            returnKeyType="done"
            selectionColor="#006bad66"
            multiline
            onChangeText={e => setBio(e)}
            value={bio}
          />
        </InputBox>
        <MainButton onPress={() => onSubmit()} label="EDITAR" />
      </EditBox>
    </>
  );
}
