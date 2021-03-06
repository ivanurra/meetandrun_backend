const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {type: String},
  username: {type: String},
  password: {type: String},
  runnerType: {type: String},
  helperType: {type: String},
  stravaLink: {type: String},
  personalLink: {type: String},
  likedRunners: {type: [String]}
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

const User = mongoose.model('User', userSchema)

module.exports = User

