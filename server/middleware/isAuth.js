const jwt = require('jsonwebtoken')
const config = require("../config/auth/key")

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.sendStatus(401)
    }
    console.log(token)
    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            console.log(err)
            return res.json(err).sendStatus(403)
        }
        req.user = user
    })
    next()
}