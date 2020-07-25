import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import editar_per_1 from '../../assets/help_imgs/editar_per_1.png';
import editar_per_2 from '../../assets/help_imgs/editar_per_2.png';
import editar_per_3 from '../../assets/help_imgs/editar_per_3.png';

import { Header } from '../../components/Header';

export default function HelpEditInfos({ navigation }) {
  return (
    <>
      <Header label="ALTERARANDO INFOS" navigation={navigation} />
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
        >
          <Image
            source={editar_per_1}
            resizeMode="contain"
            style={{ height: 400, width: 220 }}
          />
          <Image
            source={editar_per_2}
            resizeMode="contain"
            style={{ height: 400, width: 220 }}
          />
          <Image
            source={editar_per_3}
            resizeMode="contain"
            style={{ height: 400, width: 220 }}
          />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1, paddingHorizontal: 20 }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            1 - Entre no menu de opções.
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            2 - Selecione a opção de "EDITAR PERFIL".
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            3 - Altere suas informações nos campos de texto.
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            4 - Pressione o botão "EDITAR" para salvar as alterações.
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            5 - Faça logout e login para atualizar as informações no perfil.
          </Text>
        </ScrollView>
      </ScrollView>
    </>
  );
}
