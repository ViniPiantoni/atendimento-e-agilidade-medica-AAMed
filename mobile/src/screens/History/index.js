import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

import api from '../../services/api';

import {
  List,
  HistoryView,
  HistoryProp,
  HistoryInfo,
  NoHistoryView,
  Img,
  NoHistoryLabel,
} from './styles.js';
import Loading from '../../components/Loading';
import { Header } from '../../components/Header';

export default function History({ navigation }) {
  const [user, setUser] = useState(null || '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasHistory, setHasHistory] = useState(false);
  const [solicitations, setSolicitations] = useState([]);

  useEffect(() => {
    function getLoggedUser() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(AsyncStorage.getItem('store'));
        }, 1000);
      });
    }
    getLoggedUser()
      .then(data => {
        const dataParse = JSON.parse(data);
        setUser(dataParse.auth.user);
      })
      .catch(error => console.log(error));
  }, []);

  async function loadSolicitations() {
    try {
      const response = await api.get(`solicitations/${user._id}`);
      setSolicitations(response.data);
      setIsLoading(false);
      if (response.data.length > 0) return setHasHistory(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadSolicitations();
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header navigation={navigation} label={'HISTÓRICO'} />
      {hasHistory ? (
        <List
          data={solicitations}
          keyExtractor={solicitations => String(solicitations._id)}
          renderItem={({ item: solicitations }) => (
            <HistoryView>
              <HistoryProp>HOSPITAL:</HistoryProp>
              <HistoryInfo>{solicitations.hospital.name}</HistoryInfo>

              <HistoryProp>TELEFONE:</HistoryProp>
              <HistoryInfo>{solicitations.hospital.phone}</HistoryInfo>

              <HistoryProp>DESCRIÇÃO:</HistoryProp>
              <HistoryInfo>{solicitations.description}</HistoryInfo>

              <HistoryProp>DATA e HORA:</HistoryProp>
              <HistoryInfo>
                {moment(solicitations.createdAt).format('DD/MM/YYYY HH:mm')}
              </HistoryInfo>
            </HistoryView>
          )}
        />
      ) : (
        <NoHistoryView>
          <Img
            resizeMode="contain"
            source={require('../../../assets/icon.png')}
          />
          <NoHistoryLabel>
            {`    Você ainda não possui
  histórico de solicitações!`}
          </NoHistoryLabel>
        </NoHistoryView>
      )}
    </>
  );
}
