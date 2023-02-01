const ArtistRepository = require('../repository/sequelize/ArtistRepository');
const config = require("../config/auth/key")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
    const name = req.body.name
    const password = req.body.password
    ArtistRepository.findByName(name)
        .then(user => {
            user = user.dataValues
            if (!user) {
                return res.status(401).send({ message: "Nieprawidłowy email lub hasło!" })
            }

            bcrypt.compare(password, user.password)
                .then(isEqual => {
                    if (!isEqual) {
                        return res.status(401).send({ message: "Nieprawidłowy email lub hasło!" })
                    }
                    const token = jwt.sign(
                        {
                            firstName: user.FirstName,
                            userId: user.Id,
                        },
                        config.secret,
                        { expiresIn: '1h' }
                    )
                    res.status(200).json({ token: token, userId: user.Id })
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}

exports.logout = (req, res) => {

}