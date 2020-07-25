import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Menu from '../../components/Menu';
import './styles.css';
import api from '../../services/api';

export default function Login(props) {
  document.title = 'Faça login com seu hospital';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const { push } = useHistory();

  async function submit(e) {
    e.preventDefault();
    try {
      const response = await api.post(
        '/login/hospital',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem('hptid', true);
      push(`/home/${response.headers['id']}`);
    } catch (err) {
      window.scrollTo(0, 0);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 7500);
      setError(
        err.response === undefined
          ? 'Falha na conexão com o servidor!'
          : err.response.data.error
      );
    }
  }

  return (
    <>
      <Menu />
      <div className="container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="container-login">
          <div className="side">
            <div>
              <h2>Bem-vindo de volta!</h2>
              <span>Faça login para continuar!</span>
            </div>
            <div>
              <img
                src={require('../../assets/icon.png')}
                alt="AAMED - logo"
                title="AAMed"
              />
            </div>
          </div>
          <div className="content-form-login">
            <h1>Login</h1>
            {error !== null ? (
              <div className={show ? 'modal-error' : 'hide-modal'}>
                <div>{error}</div>
              </div>
            ) : (
              ''
            )}
            <form className="form-login" onSubmit={submit}>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Digite seu email"
                  autoCapitalize="none"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Digite sua senha"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <button>Fazer login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
