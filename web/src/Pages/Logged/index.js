import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import socketio from "socket.io-client";
import { IoMdSettings } from "react-icons/io";
import { AiFillMedicineBox } from "react-icons/ai";
import { FaUserCircle, FaList } from "react-icons/fa";

import "./styles.css";
import { useEffect } from "react";
import api from "../../services/api";

export default function Logged({ match }) {
  document.title = "AAMed - Gerenciamento";

  let click = React.createRef();
  let changeColor = React.createRef();
  const id = match.params.id;
  //requisição do socket
  const [user, setUser] = useState([]);
  const [acceptUser, setAcceptUser] = useState([]);
  const [ok, setOk] = useState(null);

  const [socketAll, setSocketAll] = useState(null);
  const [solicitationUser, setSolicitationUser] = useState("");

  const [userAccept, setUserAccept] = useState(false);
  const [arrived, setArrived] = useState(false);
  const [userTreatment, setUserTreatment] = useState([]);

  const { push } = useHistory();

  useEffect(() => {
    const socket = socketio("http://localhost:3333", {
      query: { hospital_id: id },
    });
    setSocketAll(socket);
    socket.on("aviso", (data) => {
      setUser([...user, data]);
      setOk(true);
    });
    socket.on("filter", (data) => {
      if (
        match.params.id !== data.hospital_id &&
        solicitationUser !== data.user_accept
      ) {
        setUser(user.filter((users) => users.user._id !== data.user_accept)); //tirar  da tela so hospital q n aceitou
      } else {
        setUserAccept(true);
      }
    });
    socket.on("arrived_web", (data) => {
      data.arrived ? setArrived(true) : setArrived(false);
      setTest(acceptUser.filter((users) => users.user._id !== data.user._id));
      setUserTreatment([...userTreatment, data.user]);
    });
  }, [id, match.params.id, solicitationUser, user]);

  function handleClick() {
    const cc = changeColor.current;
    cc.classList.toggle("bgcolorClick");
  }

  async function handleLogout() {
    await api.get("/hospital/logout", { withCredentials: true });
    localStorage.removeItem("hptid");
    push("/");
  }

  async function accept(id, desc) {
    try {
      await api.post(
        `/solicitations/${id}/approvals`,
        { description: desc },
        {
          headers: { hospital_id: match.params.id },
          withCredentials: true,
        }
      );
      setSolicitationUser(id);
      socketAll.emit("accept", {
        hospital_id: match.params.id,
        user_accept: id,
      });
      setAcceptUser(user.filter((users) => users.user._id === id));

      setUser(user.filter((users) => users.user._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function hasAttended(id) {
    setUserTreatment(userTreatment.filter((users) => users._id !== id));
  }

  function reject(id) {
    setUser(user.filter((users) => users.user._id !== id));
  }

  const [testUser, setTest] = useState([]);

  useEffect(() => {
    acceptUser.filter((users) => setTest([...testUser, users]));
  }, [acceptUser]);

  return (
    <div className="container-logged">
      <div className="flex">
        <img src={require("../../assets/hospital.jpg")} alt="" />
        <Link to="/profile" className="items">
          <FaUserCircle size={25} />
          <span>Perfil</span>
        </Link>
        <span className="config">
          <div ref={changeColor}>
            <IoMdSettings size={25} />
            <input type="checkbox" className="hidden" id="toggle" />
            <label
              htmlFor="toggle"
              className="click"
              onClick={handleClick}
              ref={click}
            >
              Configurações
            </label>
            <ul className="info-config">
              <Link to="/update">Atualizar</Link>
              <Link to={`/changepassword/${match.params.id}`}>
                Trocar senha
              </Link>
              <Link to="/deleteaccount">Excluir conta</Link>
            </ul>
          </div>
        </span>
        <Link to="/hospitals" className="items">
          <FaList size={25} />
          <span>Hospitais</span>
        </Link>
        <Link to={`/treatment/${id}`} className="items">
          <AiFillMedicineBox size={25} />
          <span>Atendimentos</span>
        </Link>
        <div onClick={handleLogout} className="items logout">
          <span className="click">Sair</span>
        </div>
      </div>
      <div className="treatments">
        <div className="espera">
          <h2>SOLICITAÇÕES</h2>
          {ok &&
            user.map((users, i) => (
              <div className="user-help" key={i}>
                <span>
                  <span style={{ fontWeight: "bold" }}>NOME:</span>{" "}
                  {users.user.name}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>CPF:</span>{" "}
                  {users.user.cpf}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>DESCRIÇÃO:</span>{" "}
                  {users.description}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>BIO:</span>{" "}
                  {users.user.bio}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>LOCALIZAÇÃO:</span>{" "}
                  {users.currentLocation}
                </span>
                <div>
                  <button
                    className="buttonAceitar"
                    onClick={() => accept(users.user._id, users.description)}
                  >
                    Aceitar
                  </button>
                  <button
                    className="buttonRecusar"
                    onClick={() => reject(users.user._id)}
                  >
                    Recusar
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="caminho">
          <h2>A CAMINHO</h2>
          {userAccept &&
            testUser.map((users, i) => (
              <div className="user-help" key={i}>
                <span>
                  <span style={{ fontWeight: "bold" }}>NOME:</span>{" "}
                  {users.user.name}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>CPF:</span>{" "}
                  {users.user.cpf}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>DESCRIÇÃO:</span>{" "}
                  {users.description}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>BIO:</span>{" "}
                  {users.user.bio}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>LOCALIZAÇÃO:</span>{" "}
                  {users.currentLocation}
                </span>
                <div>
                  <button
                    onClick={() => {
                      setTest(
                        testUser.filter(
                          (usr) => usr.user._id !== users.user._id
                        )
                      );
                      setArrived(true);
                      setUserTreatment([...userTreatment, users.user]);
                      socketAll.emit("arrived_manually", {
                        user_id: users.user._id,
                        arrived: true,
                      });
                    }}
                  >
                    Compareceu
                  </button>
                  <button
                    onClick={() => {
                      socketAll.emit("not_here", {
                        user_id: users.user._id,
                        not_here: true,
                      });
                      setTest(
                        testUser.filter(
                          (usr) => usr.user._id !== users.user._id
                        )
                      );
                    }}
                  >
                    Faltou
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="atendimento">
          <h2>EM ATENDIMENTO</h2>
          {arrived &&
            userTreatment.map((user, i) => (
              <div className="user-help" key={i}>
                <span>
                  <span style={{ fontWeight: "bold" }}>NOME:</span> {user.name}
                </span>
                <span>
                  <span style={{ fontWeight: "bold" }}>CPF:</span> {user.cpf}
                </span>
                <div>
                  <button onClick={() => hasAttended(user._id)}>
                    Atendido
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
