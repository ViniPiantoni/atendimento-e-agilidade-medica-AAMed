import React from 'react';
import './styles.css';
import {
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

export default function Rodape() {
  return (
    <div className="rodape">
      <div className="sub_rodape">
        <div className="redes_sociais">
          <ul>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaInstagram />
            </li>
            <li>
              <FaLinkedin />
            </li>
            <li>
              <FaTwitter />
            </li>
          </ul>
        </div>

        <div>
          <i>Fale Conosco: (19) 3269-4089</i>
        </div>
      </div>

      <div className="sub_rodape2">
        <div>
          <ul>
            <span className="usuarios">Usuários</span>

            <li>Aplicativo</li>
            <li>Login</li>
            <li>Cadastro</li>
            <li>Localização</li>
            <li>Suporte</li>
            <li>Termos de Uso</li>
          </ul>
        </div>
        <div>
          <ul>
            <span className="fast_Help">AAMed</span>

            <li>Certificações</li>
            <li>Membros</li>
            <li>Base</li>
            <li>Localização</li>
            <li>Contato</li>
            <li>Aplicação</li>
          </ul>
        </div>
        <div>
          <ul>
            <span className="hospitais">Hospitais</span>

            <li>Certificações</li>
            <li>Login</li>
            <li>Unidades</li>
            <li>Localização</li>
            <li>Contato</li>
            <li>Termos de Uso</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
