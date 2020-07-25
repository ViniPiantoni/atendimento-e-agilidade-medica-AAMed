import React from 'react';
import { View, ScrollView } from 'react-native';

import {
  Contact,
  NumberContact,
  Legend,
  Search,
  SearchInput,
  SearchLabel,
  Img,
  WebSupport,
  WebSupportButton,
  WebSupportLabel,
  Options,
  Button,
  Label,
  MgGlass,
} from './styles.js';
import { Header } from '../../components/Header';
import { MainButton } from '../../components/MainButton';

export default function Help({ navigation }) {
  return (
    <>
      <Header navigation={navigation} label={'AJUDA'} />

      <Contact>
        <NumberContact>Entre em contato 0800-091-002</NumberContact>
        <Legend>Dúvidas, Incidentes, Manutenções</Legend>

        <Search>
          <MgGlass name="search" />
          <SearchInput placeholder="Posso te ajudar?" />
          <SearchLabel>BUSCAR</SearchLabel>
        </Search>
      </Contact>

      <View>
        <Img source={require('../../assets/hospital.png')} />
        <WebSupport>
          <WebSupportButton>
            <WebSupportLabel>SUPORTE WEB</WebSupportLabel>
          </WebSupportButton>
        </WebSupport>
      </View>

      <ScrollView>
        <Options>
          <MainButton
            label="SOLICITAÇÃO DE ATENDIMENTO"
            onPress={() => navigation.navigate('HelpServiceRequest')}
          />
          <MainButton label="LOCALIZAÇÃO ERRADA NO MAPA" />
          <MainButton
            label="ALTERAR MINHAS INFORMAÇÕES"
            onPress={() => navigation.navigate('HelpEditInfos')}
          />
          <MainButton label="DADOS OFICIAIS DO APLICATIVO" />
          <MainButton label="ENTRE EM CONTATO CONOSCO" />
          <MainButton label="TERMOS E POLÍTICA DE PRIVACIDADE" />
        </Options>
      </ScrollView>
    </>
  );
}
