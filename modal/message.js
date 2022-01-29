const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user: mongoose.SchemaTypes.ObjectId,
    channel: mongoose.SchemaTypes.ObjectId,
    message: String,
    timeStamp: String,
    timeNumber: Number,
})

module.exports.messageModal = mongoose.model('message', messageSchema)