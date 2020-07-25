import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import illustration from '../../assets/undraw_medicine.svg';
import aamed from '../../assets/aamed.svg';

import {
  Main,
  Container,
  ListInfo,
  Card,
  CustomLine,
  InstallApp,
  Store,
} from './styles.js';
import Menu from '../../components/Menu';
import api from '../../services/api';

export default function Home() {
  document.title = 'AAMed';

  const { push } = useHistory();

  useEffect(() => {
    async function redirectToLogged() {
      if (!localStorage.getItem('hptid')) {
        return;
      }
      try {
        const response = await api.get('/hospital/verify', {
          withCredentials: true,
        });
        if (response.data.auth === 'isAuth') {
          localStorage.setItem('hptid', true);
          push(`/home/${response.headers['id']}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    redirectToLogged();
  });

  return (
    <>
      <Menu />
      <Container>
        <Main>
          <img src={aamed} alt="AAMed" />
          <h2>Atendimento e Agilidade Médica</h2>
        </Main>
        <img src={illustration} alt="Médicos" />
      </Container>
      <CustomLine />
      <ListInfo>
        <Card>
          <img src={require('../../assets/profile.png')} alt="Profile" />
          <h2>Agilidade</h2>
          <span>Em tempo real suas solicitações</span>
          <span>são enviadas para os</span>
          <span>hospitais próximos a você</span>
          <span>Chega de esperar!</span>
        </Card>
        <Card>
          <img src={require('../../assets/engine.png')} alt="Profile" />
          <h2>Gerenciamento</h2>
          <span>Você consegue facilmente</span>
          <span>abrir e gerenciar todo o</span>
          <span>procedimento de maneira</span>
          <span>fácil e dinâmica!</span>
        </Card>
        <Card>
          <img src={require('../../assets/paper.png')} alt="Profile" />
          <h2>Simplicidade</h2>
          <span>Além de bonito é simples</span>
          <span>sem problemas para usar</span>
          <span>Interface ágil e veloz</span>
          <span>Não perca tempo!</span>
        </Card>
      </ListInfo>
      <InstallApp>
        <Store>
          <h2>Google Play</h2>
          <span>Instale agora o app na Google Play</span>
          <img
            src="https://i.ya-webdesign.com/images/google-play-store-icon-png-3.png"
            alt="Google Play Store"
          />
        </Store>
        <Store>
          <h2>App Store</h2>
          <span>Instale agora o app na Apple Store</span>
          <img
            src="https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/MetroUI_Mac_App_Store.png"
            alt="Apple Store"
          />
        </Store>
      </InstallApp>
    </>
  );
}
