const Sequelize = require('sequelize')
const sequelize = require('../../config/sequelize/sequelize');

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
        unique: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane",
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        },

    },
    LastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane",
            },
            notEmpty: {
                msg: "Pole jest wymagane",
            },
            len: {
                args: [2, 100],
                msg: "Pole powinno zawierać od 2 do 100 znaków",
            },
        },

    },
    Pseudonym: {
        type: Sequelize.STRING(200),
        allowNull: true,
        unique: {
            args: true,
            msg: "Pseudonim musi być unikalny"
        },
        validate: {
            len: {
                args: [0, 200],
                msg: "Pole powinno zawierać do 200 znaków",
            },
        },
    },
    Birthdate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            isDate: {
                msg: 'Pole powinno być datą'
            },
        },
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    credentials:{
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: true
    },
});

module.exports = Artist;