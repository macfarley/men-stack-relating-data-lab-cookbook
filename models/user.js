const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
  name: String,
  required: Boolean,
});

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: Boolean,
  },
  password: {
    type: String,
    required: Boolean,
  },
  pantry: [foodSchema], // Embedding foodSchema directly into userSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;
