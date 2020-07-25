const mongoose = require('mongoose');
//tipo de dado para salbar as cordenadas (lat, long)
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

module.exports = PointSchema;
