import React, { createContext, useState, useEffect, useContext } from 'react';
import { AsyncStorage } from 'react-native';

// O StoreContext recebe o createContext que por sua vez têm um valor padrão parecido com o useState nativo
const StoreContext = createContext([{}, () => {}]);

// O useStore vai funcionar como se fosse um useState nativo por issi recebe por meio do useContext o StoreContex
export const useStore = () => {
  const [state, setState] = useContext(StoreContext);
  return [state, setState];
};

export const StoreProvider = ({ children }) => {
  const [state, setState] = useState({
    rehydrated: false,
  });

  // Este é o processo para recuperar o token e usuário logado do Storage do dispositivo quando ele reinicia a aplicação
  // O método pega os dados seta o estado pegando tudo o que tinha antes o conteudo do data
  // e atualizando a flag  rehydrated para true dizendo que o processo foi concluído
  const rehydrated = async () => {
    const data = await AsyncStorage.getItem('store');
    setState(prev => ({
      ...prev,
      ...(data && JSON.parse(data)),
      rehydrated: true,
    }));
  };

  // A função será executada quando o usuário abrir a aplicação, por isso usa-se o useEffect
  useEffect(() => {
    rehydrated();
  }, []);

  // Nesse useEffect poderia ser feito um tratamento de erro
  // já que tanto set quanto getItem são assíncronos(falltolerance)
  useEffect(() => {
    AsyncStorage.setItem('store', JSON.stringify(state));
  }, [state]);

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  );
};
