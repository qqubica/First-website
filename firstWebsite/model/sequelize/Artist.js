const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize');

const notEmpty = {
    msg: "Pole jest wymagane",
}

const Artist = sequelize.define('Artist', {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    FirstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
            notEmpty
        },
        len: {
            args: [2, 50],
            msg: "Pole powinno zawierać od 2 do 50 znaków"
        },
    },
    LastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
            notEmpty
        },
        len: {
            args: [2, 100],
            msg: "Pole powinno zawierać od 2 do 100 znaków",
        },
    },
    Pseudonym: {
        type: Sequelize.STRING(200),
        allowNull: true,
        unique: true,
        validate: {
            len: {
                args: [1, 200],
                msg: "Pole powinno zawierać od 1 do 200 znaków",
            },
        },
    },
    Birthdate: {
        type: Sequelize.DATE,
        allowNull: true,
        isDate: {
            msg: 'Pole powinno być datą'
        }
    },
});