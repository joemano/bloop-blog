const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: 'string', required: true },
  email: { type: 'string', required: true},
  password: { type: 'string', required: true},
  id: { type: 'string' }
})

const User = mongoose.model('User', userSchema);

module.exports = User;