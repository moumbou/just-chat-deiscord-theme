const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    channelName: String
})

module.exports.channelModal = mongoose.model('channel', channelSchema)