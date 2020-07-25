import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import solicitacao_1 from '../../assets/help_imgs/solicitacao_1.png';
import solicitacao_2 from '../../assets/help_imgs/solicitacao_2.png';
import solicitacao_3 from '../../assets/help_imgs/solicitacao_3.png';

import { Header } from '../../components/Header';

export default function HelpServiceRequest({ navigation }) {
  return (
    <>
      <Header label="SOLICITANDO ATENDIMENTO" navigation={navigation} />
      <ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
        >
          <Image
            source={solicitacao_1}
            resizeMode="contain"
            style={{ height: 400, width: 220 }}
          />
          <Image
            source={solicitacao_2}
            resizeMode="contain"
            style={{ height: 400, width: 220 }}
          />
          <Image
            source={solicitacao_3}
            resizeMode="contain"
            style={{ height: 400, width: 220 }}
          />
        </ScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1, paddingHorizontal: 20 }}
        >
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            1 - Preencha o motivo de sua solicitação.
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            2 - Envie a solicitação.
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            3 - Aguarde à solicitação ser aceita.
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            4 - Caso solicitação for aceita, o aplicativo mostrará quem
            aceitou-a, compartilhando os respectivos dados/orientações do
            hospital.{' '}
          </Text>
        </ScrollView>
      </ScrollView>
    </>
  );
}
