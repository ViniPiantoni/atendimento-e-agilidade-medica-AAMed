const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');
const AddressSchema = require('./utils/AddressSchema');
const bcrypt = require('bcryptjs');

const HospitalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  cnes: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: PointSchema,
    index: '2dsphere',
  },
});
//antes de salvar no banco, faz um hash na senha do hospital (encriptando)
HospitalSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
module.exports = mongoose.model('Hospital', HospitalSchema);
