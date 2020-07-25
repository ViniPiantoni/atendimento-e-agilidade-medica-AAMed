const Hospital = require('../models/Hospital');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const cep = require('cep-promise');

module.exports = {
  async index(req, res) {
    const hospitais = await Hospital.find({}, '-address -location');
    return res.send(hospitais);
  },
  async store(req, res) {
    //cadastro de hospital
    const {
      email,
      password,
      latitude,
      longitude,
      name,
      phone,
      cnpj,
      cnes,
      cep_hospital,
    } = req.body;

    try {
      //verificação se ja tem algo no banco
      if (await Hospital.findOne({ email }))
        return res.status(400).send({ error: 'Hospital já cadastrado' });
      if (await Hospital.findOne({ cnes }))
        return res.status(400).send({ error: 'Hospital já cadastrado' });
      if (await Hospital.findOne({ cnpj }))
        return res.status(400).send({ error: 'Hospital já cadastrado' });

      const location = {
        //deixar em array a latitude e longitude (PointSchema)
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      //api de cep
      const { city, state, street, neighborhood } = await cep(
        cep_hospital
      ).catch(err => {
        return res.status(400).send({ error: 'Cep inválido' });
      });

      const address = {
        //deixar em array o endereço (AddressSchema)
        city,
        state,
        street,
        neighborhood,
        cep: cep_hospital,
      };

      const hospital = await Hospital.create({
        email,
        password,
        name,
        location,
        phone,
        cnpj,
        cnes,
        address,
      });
      hospital.password = undefined;
      return res.json({
        hospital,
        token: generateToken({ id: hospital.id }), //token para login
      });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no cadastro: ' + err });
    }
  },
  async update(req, res) {
    //atualizar dados do hospital
    try {
      const { name, phone, email } = req.body;
      const hospital = await Hospital.findByIdAndUpdate(
        req.params.id,
        {
          name,
          phone,
          email,
        },
        { new: true }
      );
      return res.json(hospital);
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Falha na atualização do hospital' });
    }
  },
  async destroy(req, res) {
    try {
      const { password } = req.body;
      const hospital = await Hospital.findById(req.params.id).select(
        '+password'
      );

      if (!(await bcrypt.compare(password, hospital.password))) {
        return res
          .status(401)
          .send({ error: 'Senha inváldia, tente novamente!' });
      }
      await Hospital.findByIdAndDelete(req.params.id);

      return res.send();
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Falha na remoção do hospital ' + err });
    }
  },
  async change(req, res) {
    try {
      const { oldPassword, password } = req.body;
      const hospital = await Hospital.findById(req.params.id).select(
        '+password'
      );

      if (!(await bcrypt.compare(oldPassword, hospital.password))) {
        return res
          .status(401)
          .send({ error: 'Senha inváldia, tente novamente!' });
      }

      const newPass = await bcrypt.hash(password, 10);

      await Hospital.findByIdAndUpdate(
        req.params.id,
        {
          password: newPass,
        },
        { new: true }
      );
      return res.send();
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Falha na atualização do hospital. ' + err });
    }
  },
  async list(req, res) {
    const hospital = await Hospital.findById(req.params.id);
    return res.json(hospital);
  },
};
