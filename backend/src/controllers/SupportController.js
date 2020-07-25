const Support = require('../models/Support');

module.exports = {
  async store(req, res) {
    //cadastrar uma critica
    try {
      const { email, subject, description } = req.body;

      const support = await Support.create({
        email,
        subject,
        description,
      });
      return res.json({
        support,
      });
    } catch (err) {
      return res.status(400).send({ error: 'Falha no cadastro: ' + err });
    }
  },
};
