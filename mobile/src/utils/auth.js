import { useCallback } from 'react';
import { useStore } from '../store/store';

export const useAuth = () => {
  const [store, setStore] = useStore();

  // O uso do useCallback e a passagem do prev junto ao auth no setSotre é necessário pois
  // toda vez que o setStore é usado, sobrescreve todo o store, criando um loading infinito
  const login = useCallback(auth => setStore(prev => ({ ...prev, auth })), []);
  const logout = useCallback(() => setStore(({ auth, ...prev }) => prev), []);

  return [store && store.auth, { login, logout }];
};
