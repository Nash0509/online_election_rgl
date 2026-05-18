const mongoose = require('mongoose');

const nomineeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Nominee', nomineeSchema);
