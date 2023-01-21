const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize');

const notEmpty = {
    msg: "Pole jest wymagane",
}

const isDate = {
    msg: "Pole powinno być datą",
}

const Concert = sequelize.define('Concert', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    Venue: {
        type: Sequelize.STRING(200),
        allowNull: false,
        len: {
            args: [2,200],
            msg: "Pole nie może mieć od 2 do 200 znaków"
        }
    },
    StartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate,
        },
    },
    FinishDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isDate,
        },
    }
});

module.exports = Concert;