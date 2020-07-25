import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Loading from './src/components/Loading';
import { StoreProvider, useStore } from './src/store/store';
import { AuthDrawerScreen, GuestStackScreen } from './src/routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);
YellowBox.ignoreWarnings(['MapViewDirections Error']);
YellowBox.ignoreWarnings(["Can't perform a React state update"]);

const Router = () => {
  const [store] = useStore();

  // Enquanto o processo de rehydrated não termina, a tela de loading aparece
  if (!store.rehydrated) {
    return <Loading />;
  }

  // Se tiver algo no auth(token/usuário) retorna a rota autenticada
  // caso contrário renderiza a rota de 'usuário comum'
  return store.auth ? <AuthDrawerScreen /> : <GuestStackScreen />;
};

export default function App() {
  return (
    <NavigationContainer>
      <StoreProvider>
        <StatusBar backgroundColor="#004b8b" translucent />
        <Router />
      </StoreProvider>
    </NavigationContainer>
  );
}
