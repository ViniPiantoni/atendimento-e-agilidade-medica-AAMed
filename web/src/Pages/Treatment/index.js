import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IoMdArrowRoundBack } from 'react-icons/io';
import TreatmentModal from '../../components/TreatmentModal';
import api from '../../services/api';

export default function Treatment({ match }) {
  document.title = 'AAMed - Seus atendimentos';
  const history = useHistory();
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    async function loadTreatments() {
      const response = await api.get(`/solicitations/${match.params.id}`);
      setAtendimentos(response.data);
    }
    loadTreatments();
  }, [match.params.id]);

  return (
    <div>
      <div className="menu-profile">
        <div className="back">
          <button onClick={() => history.goBack()}>
            <IoMdArrowRoundBack size={25} />
            Voltar
          </button>
        </div>
        <div className="title-profile">
          {/* <h2>Olá {}</h2> */}
        </div>
      </div>
      <div className="content-support">
        <div>
          <h2>Aqui você encontra todos seus atendimentos!</h2>
          <span>
            Tais como hora e data da aceitação, o paciente junto com sua
            descrição.
          </span>
        </div>
        <div>
          <img
            src={require('../../assets/profile.png')}
            alt="Gerenciamento de hospitais por perto"
            title="Encontre hospitais por perto"
          />
        </div>
      </div>
      {atendimentos.map(treat => {
        return (
          <TreatmentModal
            key={treat._id}
            name={treat.user.name}
            cpf={treat.user.cpf}
            email={treat.user.email}
            bio={treat.user.bio}
            description={treat.description}
            date={new Date(treat.createdAt).toLocaleDateString('pt-br', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              weekday: 'long',
              timeZoneName: 'short',
              hour: 'numeric',
              minute: 'numeric',
            })}
          />
        );
      })}
    </div>
  );
}
