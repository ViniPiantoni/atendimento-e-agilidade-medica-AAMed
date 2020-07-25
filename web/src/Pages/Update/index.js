import React, { useState, useEffect } from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';
import InputMask from 'react-input-mask';

import './styles.css';
import api from '../../services/api';

export default function Update({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    async function loadHospital() {
      const user = await api.get('/hospital/home', {
        withCredentials: true,
      });

      const { _id, name, email, phone } = user.data.hospital;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setId(_id);
    }
    loadHospital();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api.put(
      `/hospital/${id}`,
      {
        name,
        email,
        phone,
      },
      { withCredentials: true }
    );
    history.push('/');
  }

  return (
    <>
      <div className="menu-profile">
        <div className="back">
          <button onClick={() => history.goBack()}>
            <IoMdArrowRoundBack size={25} />
            Voltar
          </button>
        </div>
        <div className="title-profile">
          <h2>Olá, nome</h2>
        </div>
      </div>
      <div className="content-support">
        <div>
          <h2>Atualize suas informações de maneira fácil e rápida!</h2>
          <span>Veja abaixo o que você pode editar e atualizar.</span>
        </div>
        <div>
          <img
            src={require('../../assets/profile.png')}
            alt="Suporte do 1° Socorros"
            title="Suporte do 1° Socorros"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="update-form">
        <h2>Atualize seus dados!</h2>
        <div>
          <label htmlFor="name">Nome do hospital</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={name}
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="phone">Telefone do hospital</label>
          <InputMask
            mask="(99)9999-9999"
            type="text"
            name="phone"
            id="phone"
            defaultValue={phone}
            onChange={e => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <button type="submit">Atualizar</button>
        </div>
      </form>
    </>
  );
}
