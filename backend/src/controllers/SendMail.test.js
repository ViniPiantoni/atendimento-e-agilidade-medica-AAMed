const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

//TEM UM ARQUIVO DE NA PASTA 'models/User.test.js' para entender esse atributo
//resetPasswordToken

module.exports = {
  //ROTA DE 'ESQUECI A SENHA'
  async forgot(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(400).send({ error: 'Usuário não encontrado' });
      } else {
        const { _id } = user;
        const emailToken = crypto.randomBytes(20).toString('hex');
        await User.findByIdAndUpdate(_id, {
          $set: {
            resetPasswordToken: emailToken,
          },
        });
        //cria uma conta no mailtrap.io
        //para fazer testes de email
        const transport = nodemailer.createTransport({
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: '', //coloca aqui seu user
            pass: '', //aqui sua senha
          },
        });
        transport.sendMail({
          to: email,
          from: 'no-reply@1sthelp',
          //tem um arquivo de teste na pasta 'web/example' para ver a verificação
          html: `Clique nesse link para alterar sua senha: <a href="http://localhost:3000/confirm/${emailToken}">Confirmar link</a>`,
        });
        return res.send();
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: 'Email não foi enviado' });
    }
  },
  //ROTA PARA RESETAR A SENHA NO FRONTEND
  async reset(req, res) {
    try {
      //DA PRA FAZER A AUTENTICAÇÃO POR ID VIA HEADERS
      const { token, email, password } = req.body;
      const user = await User.findOne({ email }).select('+resetPasswordToken');

      if (!user) {
        res.status(400).send({ error: 'Usuário não encontrado' });
      }
      if (user.resetPasswordToken !== token) {
        res.status(400).send({ error: 'Token inválido' });
      }

      user.password = password;
      user.resetPasswordToken = null;
      user.resetPasswordToken = undefined;
      await user.save();

      return res.json(user);
    } catch (error) {
      return res.status(400).send({ error: 'Erro ao resetar senha' });
    }
  },
  //ROTA PARA VERIFICAR SE O TOKEN DE EMAIL É VÁLIDO
  async verify(req, res) {
    try {
      const { mailToken } = req.params;
      const { email } = req.headers;
      const user = await User.findOne({ email }).select('+resetPasswordToken');

      if (user.resetPasswordToken === null) {
        return res
          .status(400)
          .send({ error: 'Não há token para esse usuário' });
      }

      if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado' });
      }

      if (user.resetPasswordToken !== mailToken) {
        return res.status(400).send({ error: 'Token inválido' });
      }

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: 'Erro durante a verificação' });
    }
  },
};
