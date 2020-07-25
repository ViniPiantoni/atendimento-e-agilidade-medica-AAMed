import React, { useState, useEffect } from 'react';

import { IoMdArrowRoundBack } from 'react-icons/io';

import './styles.css';
import api from '../../services/api';

export default function Delete({ history }) {
  document.title = 'AAMed - Excluir conta';

  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadHospital() {
      const hospital = await api.get('/hospital/home', {
        withCredentials: true,
      });

      const { _id, name } = hospital.data.hospital;
      setId(_id);
      setName(name);
    }
    loadHospital();
  }, []);

  async function handleSubmitDelete(e) {
    e.preventDefault();
    await api
      .delete(`/hospital/${id}`, {
        withCredentials: true,
        data: {
          password: pass,
        },
      })
      .then(response => {
        localStorage.clear();
        history.push('/');
        window.location.reload();
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
          <h2>Não utiliza mais essa conta? Não tem problema!</h2>
          <span>Confirme sua senha abaixo e exclua agora mesmo.</span>
        </div>
        <div>
          <img
            src={require('../../assets/profile.png')}
            alt="Suporte do 1° Socorros"
            title="Suporte do 1° Socorros"
          />
        </div>
      </div>
      <form onSubmit={handleSubmitDelete} className="update-form">
        <h2>Excluir conta!</h2>
        {error && (
          <div className="modal-error">
            <div>{error}</div>
          </div>
        )}
        <div>
          <label htmlFor="password">Confirmar senha</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => setPass(e.target.value)}
            value={pass}
            placeholder="Confirme sua senha"
          />
        </div>
        <div>
          <button type="submit">Deletar</button>
        </div>
      </form>
    </>
  );
}
