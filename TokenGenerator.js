const jwt = require('jsonwebtoken')

module.exports.generateToken = (id) => {
    return jwt.sign({id}, "chat", {
        expiresIn: 24 * 60 * 60
    })
}