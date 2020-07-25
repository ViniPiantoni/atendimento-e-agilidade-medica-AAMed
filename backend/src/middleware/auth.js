const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
//todas as verificações para o token do hospital
module.exports = {
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async hospital(req, res, next) {
    const { token_access } = req.cookies;
    if (!token_access) {
      return res.status(400).send({ error: 'Token não informado' });
    }

    jwt.verify(token_access, authConfig.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: `Token inválido: ${err}` });
      }
      req.hospitalId = decoded.id; //se der certo ele trará o token e continuará
      return next();
    });
  },
  async user(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.status(401).send({ error: 'Token não foi informado' });

    const parts = authHeader.split(' ');

    if (!parts.lenght === 2)
      return res.status(401).send({ error: 'Token error' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).send({ error: 'Token em formato diferente' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return res.status(401).send({ error: 'Token inválido' });

      req.userId = decoded.id; //se der certo ele trará o token e continuará
      return next();
    });
  },
};
