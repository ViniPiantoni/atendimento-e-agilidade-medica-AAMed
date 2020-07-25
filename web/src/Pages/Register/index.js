import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import Menu from '../../components/Menu';

import InputMask from 'react-input-mask';
import { cnpj } from 'cpf-cnpj-validator';

import './styles.css';

export default function Register(props) {
  document.title = 'Cadastre seu hospital';

  const { push } = useHistory();

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cnes, setCnes] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj_hospital, setCnpj] = useState('');
  const [cep_hospital, setCep] = useState('');
  const [coords, setCoords] = useState(false);

  //restrições, verificações
  const [confirmPassword, setConfirmpass] = useState('');
  const [check, setCheck] = useState(true);
  const [passEqual, setPassequal] = useState(false);
  const [validateCnpj, setValidateCnpj] = useState(true);
  const [lenghtName, setLenghtname] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  // function changeCheck(e) {
  //   const target = e.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   setCheck(value);
  // }

  async function handleForm(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassequal(true);
      return;
    } else {
      setPassequal(false);
    }

    if (!latitude && !longitude) {
      setCoords(true);
      return;
    } else {
      setCoords(false);
    }

    if (check) {
      setCheck(true);
    } else {
      setCheck(false);
      return;
    }

    if (name.length < 5) {
      setLenghtname(true);
      return;
    } else {
      setLenghtname(false);
    }

    if (cnpj.isValid(cnpj_hospital)) {
      setValidateCnpj(true);
    } else {
      setValidateCnpj(false);
      return;
    }

    try {
      await api
        .post('/hospital', {
          name,
          password,
          cnes,
          cnpj: cnpj_hospital,
          latitude,
          longitude,
          cep_hospital,
          phone,
          email,
        })
        .then(res => {
          window.scrollTo(0, 0);
          setModal(true);
          setName('');
          setCnpj('');
          setCnes('');
          setPassword('');
          setConfirmpass('');
          setPhone('');
          setCep('');
          setEmail('');
          push('Login');
        })
        .catch(exp => {
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 7500);
          setError(
            exp.response === undefined
              ? 'Falha na conexão com o servidor!'
              : exp.response.data.error
          );
        });
    } catch (response) {
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  return (
    <>
      <Menu />

      <div className="container">
        {coords
          ? window.alert(
              'Você deve permitir a localização. Precisamos da latitude e longitude'
            )
          : ''}
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="container-register">
          <div className="side-register">
            <div>
              <h2>Olá! Faça o cadastro de seu hospital</h2>
              <span>Junte-se a nós e ajude a salvar o próximo!</span>
            </div>
            <div>
              <img src={require('../../assets/icon.png')} alt="" />
            </div>
          </div>
          <div className="content-form-register">
            <h1>Cadastre seu hospital</h1>
            {modal ? (
              <div className="modal">
                <div>Cadastro realizado com sucesso</div>
              </div>
            ) : (
              ''
            )}
            {error !== null ? (
              <div className={show ? 'modal-error' : 'hide-modal'}>
                <div>{error}</div>
              </div>
            ) : (
              ''
            )}
            <div>
              <form className="form-register" onSubmit={handleForm}>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    onChange={email => setEmail(email.target.value)}
                    value={email}
                  />
                  <label htmlFor="email">Digite seu email</label>
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    onChange={password => setPassword(password.target.value)}
                    value={password}
                  />
                  <label htmlFor="passowrd">Digite sua senha</label>
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPass"
                    id="confirmPass"
                    required
                    onChange={confirmPassword =>
                      setConfirmpass(confirmPassword.target.value)
                    }
                    value={confirmPassword}
                  />
                  <label htmlFor="confirmPass">Confirmar senha</label>
                </div>
                {passEqual ? (
                  <span className="error">Senhas incompatíveis</span>
                ) : (
                  ''
                )}
                <div>
                  <input
                    type="text"
                    required
                    id="name"
                    name="name"
                    onChange={name => setName(name.target.value)}
                    value={name}
                  />
                  <label htmlFor="name">Digite o nome do hospital</label>
                </div>
                {lenghtName ? (
                  <span className="error">
                    Nome deve ter pelo menos 5 caracteres!
                  </span>
                ) : (
                  ''
                )}
                <div>
                  <InputMask
                    mask="9999999"
                    type="text"
                    required
                    name="cnes"
                    id="cnes"
                    onChange={cnes => setCnes(cnes.target.value)}
                    value={cnes}
                  />
                  <label htmlFor="cnes">Digite o número do CNES</label>
                </div>
                <div>
                  <InputMask
                    type="text"
                    required
                    mask="99.999.999/9999-99"
                    id="cnpj"
                    onChange={cnpj_hpt => setCnpj(cnpj_hpt.target.value)}
                    value={cnpj_hospital}
                  />
                  <label htmlFor="cnpj">Digite o cnpj do hospital</label>
                </div>
                {validateCnpj ? (
                  ''
                ) : (
                  <span className="error">CNPJ inválido!</span>
                )}
                <div>
                  <InputMask
                    type="text"
                    name="phone"
                    mask="(99)9999-9999"
                    required
                    id="phone"
                    onChange={phone => setPhone(phone.target.value)}
                    value={phone}
                  />
                  <label htmlFor="phone">Digite o telefone do hospital</label>
                </div>
                <div>
                  <InputMask
                    mask="99999999"
                    type="text"
                    name="cep_hospital"
                    required
                    id="cep"
                    onChange={cep => setCep(cep.target.value)}
                    value={cep_hospital}
                  />
                  <label htmlFor="cep">CEP do hospital</label>
                </div>
                <div>
                  <input
                    type="text"
                    name="latitude"
                    required
                    placeholder="Latitude"
                    className="coordinate"
                    value={latitude}
                    disabled
                    onChange={latitude => setLatitude(latitude.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    required
                    className="coordinate"
                    value={longitude}
                    disabled
                    onChange={longitude => setLongitude(longitude.target.value)}
                  />
                </div>
                <button type="submit">Cadastrar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
