import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

import api from '../../services/api';

import './styles.css';
import { HospitalModal } from '../../components';

export default function Hospitals(props) {
  document.title = 'AAMed - Hospitais por perto';
  const [hospitals, setHospitals] = useState([]);
  const [nameLogged, setNamelogged] = useState('');
  const [modal, setModal] = useState(null);
  const [idClick, setIdclick] = useState(null);

  useEffect(() => {
    async function getHospitals10() {
      const hospitalLogged = await api.get('/hospital/home', {
        withCredentials: true,
      });
      const { location, _id, name } = hospitalLogged.data.hospital;
      console.log(location);
      setNamelogged(name);
      const longitude = location.coordinates[0];
      const latitude = location.coordinates[1];

      const response = await api.get('/search', {
        headers: {
          hospital: _id,
        },
        params: {
          latitude,
          longitude,
        },
      });
      setHospitals(response.data.hospitais);
    }
    getHospitals10();
  }, []);

  return (
    <>
      <div className="menu-hospitals">
        <div className="back">
          <button onClick={() => props.history.goBack()}>
            <IoMdArrowRoundBack size={25} />
            Voltar
          </button>
        </div>
        <div className="title-profile">
          <h2>Olá, {nameLogged}</h2>
        </div>
      </div>
      <div className="content-support">
        <div>
          <h2>Veja abaixo os hospitais perto de você!</h2>
          <span>Aqui está os hospitais mais próximos!.</span>
        </div>
        <div>
          <img
            src={require('../../assets/profile.png')}
            alt="Gerenciamento de hospitais por perto"
            title="Encontre hospitais por perto"
          />
        </div>
      </div>
      <div className="container-hospitals">
        {hospitals.length ? (
          hospitals.map((hospital, index) => (
            <div key={hospital._id} className="box">
              <h2>{hospital.name}</h2>
              <button
                className="btnOpen"
                onClick={() => {
                  setIdclick(hospital._id);
                  setModal(true);
                }}
              >
                Clique para saber mais
              </button>
            </div>
          ))
        ) : (
          <div className="notFound">
            <h2>Parece que não há hospitais perto de você! :(</h2>
          </div>
        )}
        {modal ? (
          <>
            <HospitalModal id={idClick} />
            <button className="btnClose" onClick={() => setModal(false)}>
              Fechar
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
