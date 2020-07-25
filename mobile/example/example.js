//quando clicar no botao de Emergencia ou urgencia
//chama essa função

//no useEffect(), tem que pegar os hospitais por perto

const [hospitals, setHospitals] = useState([]);

useEffect(() => {
  async function getHospitals() {
    const response = await api.get("/search", {
      params: {
        latitude, //latitude do user
        longitude, //longitude do user
      },
    });
    setHospitals(response.data.hospitals);
  }
  getHospitals();
}, []);

function getIds() {
  hospitals.map((hospital) => {
    allIds.push(hospital._id);
  });

  socket = socketio("http://192.168.15.2:3333", {
    query: { user_id },
  });
  
  //emit que faz a requisição, ou seja, ele manda p backend uma informação
  socket.emit("hospitals_id", {
    ids: { allIds }, //ids de hospitais perto de mim
    user_id, //id do user logado
    email: user_email, //email do user logado
  });
}
