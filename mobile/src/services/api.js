import axios from 'axios';

// A baseURL muda se estiver em um dipositivo fisico
// olhar o endereço na aba do expo quando abrir
const api = axios.create({
  //mudar de ip japa e vini
  baseURL: 'http://10.0.0.53:3333',
});

export default api;
