const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    avatar: String,
    id: String
})

module.exports.userModal = mongoose.model('user', userSchema)