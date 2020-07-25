const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = {
  //listar usuarios
  async index(req, res) {
    const users = await User.find({}, '-_id');
    return res.send(users);
  },
  //cadastro de usuarios
  async store(req, res) {
    try {
      const { name, cpf, email, password, bio } = req.body;

      //verificar se tem no banco
      if (await User.findOne({ cpf }))
        return res.status(400).json({ error: 'Usuário já cadastrado' });
      if (await User.findOne({ email }))
        return res.status(400).json({ error: 'Usuário já cadastrado' });

      const user = await User.create({
        name,
        cpf,
        email,
        password,
        bio,
      });
      user.password = undefined; //não trazer a senha quando cadastrar
      return res.json({ user });
    } catch (err) {
      return res.status(400).json({ error: 'Falha no cadastro: ' + err });
    }
  },
  //login do usuario
  async login(req, res) {
    try {
      const { cpf, password } = req.body;

      const userPlus = await User.findOne({ cpf }).select('+password');
      const user = await User.findOne({ cpf });

      //verificar se existe e se a senha é igual
      if (!userPlus) {
        res.status(401).json({ error: 'Usuário incorreto!' }); // algum erro no console
      }

      if (!(await bcrypt.compare(password, userPlus.password))) {
        return res.status(401).json({ error: 'Senha incorreta!' });
      }

      return res.json({
        user,
        token: user.generateToken(), //token para login
      });
    } catch (err) {
      return res.status(400).json({ error: 'Falha no login: ' + err });
    }
  },
  //atualizar dados do usuario
  async update(req, res) {
    try {
      // const { name, password, email, susCard, cpf, bio } = req.body;
      const { name, email, bio } = req.body;
      //esses dados não poderão ser alterados
      // if (password || susCard || cpf)
      //   return res
      //     .status(400)
      //     .send({ error: "Esses dados não podem ser atualizados" });

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          bio,
        },
        { new: true }
      );

      return res.json(user);
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Falha na atualização do usuário' + err });
    }
  },
};
