const mongoose = require('mongoose');

const SolicitationSchema = new mongoose.Schema(
  {
    description: String,
    approved: Boolean,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hospital',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Solicitation', SolicitationSchema);
