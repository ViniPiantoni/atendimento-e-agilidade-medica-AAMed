import React, { Component } from 'react';
import './style.css';
import Menu from '../../components/Menu';
import imgInicial from '../../assets/imgAbout.jpeg';
import imgDescription2 from '../../assets/imgDescription2.jpeg';
import imgDescription1 from '../../assets/imgDescription.jpeg';

export default class About extends Component {
  componentDidMount() {
    document.title = 'Sobre a AAMed';
  }
  render() {
    return (
      <>
        <Menu />

        <div className="max_width">
          <div className="img_inicial">
            <img src={imgInicial} alt="imginicial"></img>

            <div className="mae_fraseimg">
              <div className="frase_img">
                <span typeof="text">De uma sala para o mundo!</span>
                <a href="#descricao2">Saiba mais!</a>
              </div>
            </div>
          </div>

          <div className="descricao1">
            <div className="img_descricao1">
              <img src={imgDescription2} alt="imgDescription2"></img>
            </div>
            <div className="text_descricao1">
              <h2> A melhor empresa</h2>
              <h2>
                {' '}
                FourMembers é considerada a melhor empresa para se trabalhar em
                Campinas
              </h2>
            </div>
          </div>

          <div className="descricao2" id="descricao2">
            <div className="img_descricao2">
              <img src={imgDescription1} alt="imgDescription1"></img>
            </div>

            <div className="text_descricao2">
              <h2>De uma sala para o mundo!</h2>

              <h2>
                Somos a FourMembers, uma empresa de tecnologia voltada para
                melhorar e automatizar ações que a sociedade necessita. O
                surgimento da FourMembers partiu de um projeto para conclusão de
                curso feito por quatro estudantes, a porta de entrada para o
                ápice da FourMembers foi o aplicativo FastHelp.
              </h2>
            </div>
          </div>

          <div className="div_top"></div>
        </div>
      </>
    );
  }
}
