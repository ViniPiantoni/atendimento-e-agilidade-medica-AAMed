const Hospital = require('../models/Hospital');

module.exports = {
  //trazer hospitais por perto em torno de 10km atraves da url(query)
  async index(req, res) {
    try {
      const { latitude, longitude } = req.query;
      const { hospital } = req.headers;
      let hospitais;
      if (hospital) {
        hospitais = await Hospital.find({
          $and: [{ _id: { $ne: hospital } }],
          location: {
            //variaveis do mongo
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: 30000,
            },
          },
        });
      } else {
        hospitais = await Hospital.find({
          location: {
            //variaveis do mongo
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },
              $maxDistance: 30000,
            },
          },
        });
      }

      return res.json({ hospitais });
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Erro na busca de hospitais: ' + err });
    }
  },
};
