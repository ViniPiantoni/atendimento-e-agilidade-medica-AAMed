const Hospital = require('../models/Hospital');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async index(req, res) {
    //login do hospital
    try {
      const { email, password } = req.body;
      const hospital = await Hospital.findOne({ email }).select('+password');
      //verificar se tem algo no banco
      if (!hospital) {
        return res
          .status(401)
          .send({ error: 'Email e/ou senha não encontrado' });
      }
      if (!(await bcrypt.compare(password, hospital.password))) {
        return res
          .status(401)
          .send({ error: 'Email e/ou senha não encontrado' });
      }
      const token = generateToken({ id: hospital.id });
      //para segurança, enviar o token de acesso por cookie httpOnly
      res.cookie('token_access', token, {
        httpOnly: true,
      });
      res.cookie('id_hospital', hospital.id, {
        httpOnly: true,
      });
      res.setHeader('id', hospital.id);

      return res.status(200).end();
    } catch (error) {
      return res.status(400).send({ error: `Falha no login: ${error}` });
    }
  },
};
