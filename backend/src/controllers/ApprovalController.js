const Solicitation = require('../models/Solicitation');
const Hospital = require('../models/Hospital');
const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;
    const { hospital_id } = req.headers;
    const { description } = req.body;
    if (!(await User.findById(user_id))) {
      return res.status(400).send({ error: 'Usuário não existe' });
    }

    if (!(await Hospital.findById(hospital_id))) {
      return res.status(400).send({ error: 'Hospital não existe!' });
    }

    const solicitation = await Solicitation.create({
      user: user_id,
      hospital: hospital_id,
      approved: true,
      description,
    });

    const userID = await solicitation
      .populate('hospital')
      .populate('user')
      .execPopulate();

    const solicitationUserSocket = req.connectedUsers[user_id];
    if (solicitationUserSocket) {
      req.io.to(solicitationUserSocket).emit('solicitation_response', userID);
    }

    return res.json(solicitation);
  },
};
