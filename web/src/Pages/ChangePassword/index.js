import React, { useState, useEffect } from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';

import './styles.css';
import api from '../../services/api';

export default function ChangePass({ history, match }) {
  document.title = 'AAMed - Trocar de senha';

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadHospital() {
      const hospital = await api.get('/hospital/home', {
        withCredentials: true,
      });

      const { name } = hospital.data.hospital;
      setName(name);
    }
    loadHospital();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await api
      .put(`/change/${match.params.id}`, {
        password,
        oldPassword,
      })
      .then(response => {
        history.push(`/home/${match.params.id}`);
      })
      .catch(err => {
        setError(err.response.data.error);
      });
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
          <h2>Olá, {name}</h2>
        </div>
      </div>
      <div className="content-support">
        <div>
          <h2>Atualize sua senha e fique mais seguro!</h2>
          <span>Confirme sua senha antiga e crie uma nova.</span>
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
        <h2>Atualize sua senha!</h2>
        {error && (
          <div className="modal-error">
            <div>{error}</div>
          </div>
        )}
        <div>
          <label htmlFor="password">Sua senha antiga</label>
          <input
            type="password"
            name="old-password"
            id="old-password"
            onChange={e => setOldPassword(e.target.value)}
            value={oldPassword}
          />
        </div>
        <div>
          <label htmlFor="password">Sua senha nova</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="submit">Atualizar</button>
        </div>
      </form>
    </>
  );
}
