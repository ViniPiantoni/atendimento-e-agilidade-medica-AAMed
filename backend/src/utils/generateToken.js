const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret); //gerar token via id do hospital e user e um md5 no arquivo auth.json
};
