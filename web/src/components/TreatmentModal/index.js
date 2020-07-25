import React from 'react';

import './styles.css';

export default function TreatmentModal({
  name,
  cpf,
  bio,
  email,
  description,
  date,
}) {
  return (
    <>
      <div className="modal-treatment">
        <div>
          <div>
            <h2>NOME:</h2>
            <h2>CPF:</h2>
            <h2>EMAIL:</h2>
            <h2>BIO:</h2>
            <h2>DESCRIÇÃO:</h2>
            <h2>HORA E DATA:</h2>
          </div>
          <div>
            <h2>{name}</h2>
            <h2>{cpf}</h2>
            <h2>{email}</h2>
            <h2>{bio}</h2>
            <h2>{description}</h2>
            <h2>{date}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
