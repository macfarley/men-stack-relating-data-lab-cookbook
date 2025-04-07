const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
  name: String,
  required: true,
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: foodSchema, // Embedding foodSchema directly into userSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
