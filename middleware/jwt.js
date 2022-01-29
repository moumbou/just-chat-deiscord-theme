const jwt = require('jsonwebtoken')

module.exports.jwtMiddleWare = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token) return res.json({ auth: false, message: 'authentication denied' })

    jwt.verify(token, "chat", (err, decoded) => {
        if(err) return res.json({ auth: false, message: "not authenticated" })
        req.userId = decoded.id
        next()
    })
}