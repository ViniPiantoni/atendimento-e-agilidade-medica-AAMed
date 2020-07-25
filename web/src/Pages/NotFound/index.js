import React, { Component } from 'react';
import logo from '../../assets/icon.png';
import { Link } from 'react-router-dom';
//import { FaAngleLeft } from 'react-icons/fa';
import './styles.css';

export default class NotFound extends Component {
  componentDidMount() {
    document.title = 'Ops! Não encontramos';
  }

  render() {
    return (
      <div className="wrapper-404">
        <header>
          <nav></nav>
          <div className="broken">
            <p className="upper">Oops! 404 - Not found.</p>
            <img src={logo} alt="logo broken" />
            <p className="lower">
              Não conseguimos encontrar a página que você está solicitando.
            </p>
            <Link to="/" className="btnHome">
              Voltar à página inicial
            </Link>
          </div>
        </header>
      </div>
    );
  }
}
