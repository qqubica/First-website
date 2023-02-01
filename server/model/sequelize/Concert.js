const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize');

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
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2,200],
                msg: "Pole nie może mieć od 2 do 200 znaków"
            }
        }

    },
    StartDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno być datą",
            },
        },
    },
    FinishDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane",
            },
            isDate: {
                msg: "Pole powinno być datą",
            },
        },
    }
});

module.exports = Concert;