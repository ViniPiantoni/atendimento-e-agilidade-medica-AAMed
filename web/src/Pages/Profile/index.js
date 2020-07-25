import React, { useState, useEffect } from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdLocationOn } from 'react-icons/md';

import api from '../../services/api';
import './styles.css';

export default function Profile(props) {
  document.title = 'AAMed - Perfil';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cnes, setCnes] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [cep, setCep] = useState('');

  useEffect(() => {
    async function handleInformations() {
      const response = await api.get('/hospital/home', {
        withCredentials: true,
      });
      const {
        cnes,
        cnpj,
        name,
        email,
        phone,
        address,
      } = response.data.hospital;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setCnes(cnes);
      setCnpj(cnpj);
      setCity(address.city);
      setState(address.state);
      setStreet(address.street);
      setNeighborhood(address.neighborhood);
      setCep(address.cep);
    }
    handleInformations();
  }, []);

  return (
    <>
      <div className="menu-profile">
        <div className="back">
          <button onClick={() => props.history.goBack()}>
            <IoMdArrowRoundBack size={25} />
            Voltar
          </button>
        </div>
        <div className="title-profile">
          <h2>Olá, {name}</h2>
        </div>
      </div>
      <div className="content-support">
        <div>
          <h2>Veja seu perfil rápido e fácil!</h2>
          <span>Verificando se tudo está correto? Está fazendo certo.</span>
        </div>
        <div>
          <img
            src={require('../../assets/profile.png')}
            alt="Suporte do 1° Socorros"
            title="Suporte do 1° Socorros"
          />
        </div>
      </div>
      <div className="profile">
        <div className="container-profile">
          <div className="container-top">
            <div className="container-img">
              <img src={require('../../assets/icon.png')} alt="" />
            </div>
            <div>
              <span>
                <MdLocationOn size={20} />
                <p>
                  {city}, {state}
                </p>
              </span>
            </div>
          </div>
          <div className="container-bottom">
            <h2>Veja abaixo suas informações :)</h2>
            <div className="content-bottom">
              <div>
                <h2>Nome: </h2>
                <h2>Bairro: </h2>
                <h2>Rua: </h2>
                <h2>Cidade: </h2>
                <h2>Estado: </h2>
                <h2>CEP: </h2>
                <h2>E-mail: </h2>
                <h2>CNES: </h2>
                <h2>Cnpj: </h2>
                <h2>Telefone: </h2>
              </div>
              <div>
                <h2>{name}</h2>
                <h2>{neighborhood}</h2>
                <h2>{street}</h2>
                <h2>{city}</h2>
                <h2>{state}</h2>
                <h2>{cep}</h2>
                <h2>{email}</h2>
                <h2>{cnes}</h2>
                <h2>{cnpj}</h2>
                <h2>{phone}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
