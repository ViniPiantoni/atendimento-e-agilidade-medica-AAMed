const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  email: String,
  resetPasswordToken: {
    type: String,
    select: false,
  },
  password: String,
  // confirmed: Boolean
});

module.exports = model('User', UserSchema);
